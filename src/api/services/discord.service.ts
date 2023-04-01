// 3rd Party Library
import {
  Client,
  TextChannel,
  Message,
  NewsChannel,
  Intents,
  MessageOptions,
  MessageEmbed,
  ColorResolvable,
  EmbedAuthorData,
  EmbedFooterData,
  GuildMember,
  PartialGuildMember,
  MessageAttachment
} from 'discord.js';

// NodeJS Library
import { createReadStream } from 'node:fs';
import { URL } from 'node:url';

import { Injectable } from '@nestjs/common';
import { Equal, In, Not } from 'typeorm';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { AttachmentModel, RoleModel, SosMedModel } from '../../models/req-res.model';

import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { CryptoService } from './crypto.service';
import { GlobalService } from './global.service';

import { FansubMemberService } from '../repository/fansub-member.service';
import { UserService } from '../repository/user.service';
import { DdlFileService } from '../repository/ddl-file';

@Injectable()
export class DiscordService {

  bot: Client = null;

  constructor(
    private api: ApiService,
    private cfg: ConfigService,
    private cs: CryptoService,
    private gs: GlobalService,
    private userRepo: UserService,
    private fansubMemberRepo: FansubMemberService,
    private ddlFileRepo: DdlFileService
  ) {
    if (environment.production) {
      this.startBot();
    }
  }

  startBot(): void {
    this.bot = new Client({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING
      ],
      partials: [
        'MESSAGE',
        'REACTION',
        'GUILD_MEMBER',
        'USER',
        'CHANNEL'
      ]
    });
    this.bot.on('messageCreate', (msg: Message) => {
      if (msg.channel.id === environment.discordBotChannelBotId && msg.content.startsWith('~')) {
        this.gs.log(`[${msg.guild.name}] 🎉 [${(msg.channel as TextChannel).name}] [${msg.author.username}#${msg.author.discriminator}] ${msg.content} 🎶`);
        this.handleMessage(msg);
      }
    });
    this.bot.on('ready', async () => {
      try {
        this.gs.log(`[DISCORD_SERVICE-READY] 🎉 ${this.bot.user.username}#${this.bot.user.discriminator} - ${this.bot.user.id} 🎶`);
        this.changeBotNickname();
      } catch (error) {
        this.gs.log('[DISCORD_SERVICE-FAILED] 🎉', error, 'error');
        this.cfg.github = null;
      }
    });
    this.bot.on('guildMemberRemove', async member => {
      this.gs.log(`[DISCORD_SERVICE-MEMBER_LEAVE] 🎉 ${member.user.username}#${member.user.discriminator} - ${member.user.id} 🎶`);
      this.memberLeftRemoveVerifiedDemote(member);
    });
    this.bot.login(environment.discordBotLoginToken).catch(err => this.gs.log('[DISCORD_SERVICE-LOGIN] 🎉', err, 'error'));
  }

  async sendNews(message: MessageOptions): Promise<void> {
    try {
      const botNewsChannel = this.bot ? (this.bot.channels.cache.get(environment.discordBotChannelEventId) as NewsChannel) : null;
      if (botNewsChannel) {
        const msg = await botNewsChannel.send(message);
        await msg?.crosspost();
      }
    }  catch (error) {
      this.gs.log('[DISCORD_SERVICE-SEND_NEWS] 🎉', error, 'error');
    }
  }

  async sendAttachment(attachment: AttachmentModel, chunkIdx = null): Promise<string> {
    let currentChunkIdx: number = 0;
    let chunkParent: string = null;
    const crs = createReadStream(
      `${environment.uploadFolder}/${attachment.name}`,
      {
        highWaterMark: CONSTANTS.fileSizeAttachmentChunkDiscordLimit
      }
    );
    for await (const c of crs) {
      this.gs.log('[DISCORD_SERVICE-CHUNK] 🎉', c.length);
      if (!chunkIdx || chunkIdx === currentChunkIdx) {
        try {
          const botDdlChannel = this.bot ? (this.bot.channels.cache.get(environment.discordBotChannelDdlId) as NewsChannel) : null;
          if (botDdlChannel) {
            const msg = await botDdlChannel.send({
              files: [new MessageAttachment(c, `${attachment.name}_${currentChunkIdx}`)]
            });
            if (currentChunkIdx === 0) {
              chunkParent = msg.id;
            } else if (attachment.discord) {
              chunkParent = attachment.discord;
            }
            const ddlFile = this.ddlFileRepo.new();
            ddlFile.msg_id = chunkParent;
            ddlFile.chunk_idx = currentChunkIdx;
            ddlFile.user_ = attachment.user_;
            ddlFile.id = msg.attachments.first().id;
            ddlFile.name = msg.attachments.first().name;
            ddlFile.url = msg.attachments.first().url;
            ddlFile.size = msg.attachments.first().size;
            ddlFile.mime = msg.attachments.first().contentType || 'application/octet-stream';
            await this.ddlFileRepo.save(ddlFile);
          }
        } catch (error) {
          this.gs.log('[DISCORD_SERVICE-SEND_ATTACHMMENT_ERROR] 🎉', error, 'error');
        }
      }
      currentChunkIdx++;
    }
    return chunkParent;
  }

  createEmbedMessageEmptyRawTemplate(): MessageEmbed {
    return new MessageEmbed();
  }

  createEmbedMessage(
    setColor: ColorResolvable,
    setTitle: string,
    setUrl: string,
    setAuthor: EmbedAuthorData,
    setDescription: string,
    setThumbnail: string,
    setTimestamp: number | Date,
    setFooter: EmbedFooterData
  ): MessageOptions {
    return {
      embeds: [
        new MessageEmbed()
          .setColor(setColor)
          .setTitle(setTitle)
          .setURL(setUrl)
          .setAuthor({
            name: setAuthor.name,
            iconURL: setAuthor.iconURL.startsWith('/') ? environment.baseUrl + setAuthor.iconURL : setAuthor.iconURL,
            url: setAuthor.url
          })
          .setDescription(this.gs.htmlToText(setDescription))
          .setThumbnail(setThumbnail.startsWith('/') ? environment.baseUrl + setThumbnail : setThumbnail)
          .setTimestamp(setTimestamp)
          .setFooter({
            text: setFooter.text,
            iconURL: setFooter.iconURL.startsWith('/') ? environment.baseUrl + setFooter.iconURL : setFooter.iconURL
          })
      ]
    };
  }

  async handleMessage(msg: Message): Promise<void> {
    try {
      if (msg.content === '~about') {
        await msg.reply({ content: `<@${msg.author.id}> https://github.com/${environment.author}/${environment.siteName}` });
      } else if (msg.content === '~ping') {
        const latency = new Date().getTime() - new Date(msg.createdTimestamp).getTime();
        await msg.reply({ content: `<@${msg.author.id}> Pong ${latency} ms late!` });
      } else if (msg.content.startsWith('~verify ')) {
        await this.verifyAccount(msg);
      } else {
        await msg.reply({ content: `<@${msg.author.id}> Perintah tidak sesuai, silahkan lihat ${environment.baseUrl}/docs dan ${environment.baseUrl}/api` });
      }
      if (msg.content.includes('DELETE_CHAT')) {
        await msg.delete();
      }
    } catch (error) {
      this.gs.log('[DISCORD_SERVICE-HANDLE_MESSAGE] 🎉', error, 'error');
    }
  }

  async changeBotNickname(): Promise<void> {
    try {
      const url = new URL(`https://api.github.com/repos/${environment.author}/${environment.siteName}/commits`);
      const res_raw = await this.api.getData(url, environment.nodeJsXhrHeader);
      if (res_raw.ok) {
        const gh: any = await res_raw.json();
        this.cfg.github = gh[0];
        this.bot.guilds.cache.get(environment.discordGuildId)?.members.cache.get(this.bot.user.id)?.setNickname(`${environment.siteName} - ${this.cfg.github?.sha?.slice(0, 7)}`);
      }
      throw new Error('Github API Error');
    } catch (error) {
      this.gs.log('[DISCORD_SERVICE-CHANGE_BOT_NICKNAME] 🎉', error, 'error');
    }
  }

  async verifyAccount(msg: Message): Promise<Message<boolean>> {
    try {
      const args = msg.content.split(' ');
      if (args.length >= 3 && args.length <= 4) {
        const decoded = this.cs.jwtDecrypt(args[2]);
        if (decoded.discord.id === msg.author.id) {
          const user = await this.userRepo.findOneOrFail({
            where: [
              { id: Equal(decoded.user.id) }
            ],
            relations: ['kartu_tanda_penduduk_', 'profile_']
          })
          if (user.verified) {
            return await msg.reply({ content: `<@${msg.author.id}> Akun sudah diverifikasi 😍 Yeay 🥰` });
          } else if (args[1] === SosMedModel.DISCORD) {
            if (!decoded.discord.verified) {
              return await msg.reply({ content: `<@${msg.author.id}> Akun discord belum terverifikasi 🤔` });
            }
            user.verified = true;
            await this.userRepo.save(user);
            const laboratoryRatsRole = msg.guild.roles.cache.get(environment.laboratoryRatsRoleId);
            if (!msg.member.roles.cache.has(laboratoryRatsRole.id)) {
              await msg.guild.members.cache.get(decoded.discord.id).roles.add(laboratoryRatsRole);
            }
            await msg.reply({ content: `<@${msg.author.id}> 😚 .: Berhasil :: ${user.username}@${environment.mailGun.domain} :. 🤩` });
            return await (msg.guild.channels.cache.get(environment.discordBotChannelEventId) as TextChannel).send({
              embeds: [
                new MessageEmbed()
                  .setColor('#69f0ae')
                  .setTitle(user.kartu_tanda_penduduk_.nama)
                  .setURL(`${environment.baseUrl}/user/${user.username}`)
                  .setAuthor({
                    name: `${environment.siteName} - Verifikasi Pengguna`,
                    iconURL: `${environment.baseUrl}/assets/img/favicon.png`,
                    url: environment.baseUrl
                  })
                  .setDescription(this.gs.htmlToText(user.profile_.description))
                  .setThumbnail(user.image_url.startsWith('/') ? environment.baseUrl + user.image_url : user.image_url)
                  .setTimestamp(user.updated_at)
                  .setFooter({
                    text: user.username,
                    iconURL: user.image_url.startsWith('/') ? environment.baseUrl + user.image_url : user.image_url
                  })
              ]
            });
          }
          throw new Error('Format Data Salah / Token Expired!');
        }
        return await msg.reply({ content: `<@${msg.author.id}> Anda siapa ya? Ini milik orang lain 🤔` });
      }
      return await msg.reply({ content: `<@${msg.author.id}> Untuk verifikasi, kunjungi ${environment.baseUrl}/verify-discord 🤔` });
    } catch (error) {
      try {
        return await msg.reply({ content: `<@${msg.author.id}> Format data salah atau token expired 🤔` });
      } catch (e) {
        this.gs.log('[DISCORD_SERVICE-VERIFY_ACCOUNT] 🎉', e, 'error');
        return null;
      }
    }
  }

  async memberLeftRemoveVerifiedDemote(member: GuildMember | PartialGuildMember): Promise<void> {
    try {
      const user = await this.userRepo.findOneOrFail({
        where: [
          {
            verified: true,
            discord: Equal(member.user.id),
            role: Not(In([RoleModel.ADMIN, RoleModel.MODERATOR]))
          }
        ]
      });
      await this.userRepo.update({
        id: Equal(user.id)
      }, {
        verified: false,
        role: RoleModel.USER
      });
      const fansubMembers = await this.fansubMemberRepo.find({
        where: [
          {
            user_: {
              id: Equal(user.id)
            }
          }
        ],
        relations: ['user_']
      });
      await this.fansubMemberRepo.remove(fansubMembers);
    } catch (e) {
      this.gs.log('[DISCORD_SERVICE-MEMBER_LEAVE] 🎉', e, 'error');
    }
  }

}
