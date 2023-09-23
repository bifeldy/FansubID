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

import { AttachmentModel, RoleModel, SosMedModel, UserModel } from '../../models/req-res.model';

import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { CryptoService } from './crypto.service';
import { GlobalService } from './global.service';

import { FansubMemberService } from '../repository/fansub-member.service';
import { UserService } from '../repository/user.service';
import { DdlFileService } from '../repository/ddl-file';
import { SocialMediaService } from '../repository/social-media.service';

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
    private ddlFileRepo: DdlFileService,
    private sosmedRepo: SocialMediaService
  ) {
    if (environment.production) {
      this.startBot();
    }
  }

  startBot(): void {
    this.bot = new Client({
      restRequestTimeout: 60 * 1000,
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
      if (msg.channel.id === environment.discord.channelBotId && msg.content.startsWith('~')) {
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
    this.bot.login(environment.discord.loginToken).catch(err => this.gs.log('[DISCORD_SERVICE-LOGIN] 🎉', err, 'error'));
  }

  async sendNews(message: MessageOptions): Promise<void> {
    try {
      const botNewsChannel = this.bot ? (this.bot.channels.cache.get(environment.discord.channelEventId) as NewsChannel) : null;
      if (botNewsChannel) {
        const msg = await botNewsChannel.send(message);
        await msg?.crosspost();
      }
    }  catch (error) {
      this.gs.log('[DISCORD_SERVICE-SEND_NEWS] 🎉', error, 'error');
    }
  }

  async deleteAttachment(msg_ids: string[]): Promise<void> {
    try {
      const botDdlChannel = this.bot ? (this.bot.channels.cache.get(environment.discord.channelDdlId) as NewsChannel) : null;
      if (botDdlChannel) {
        for (const msg_id of msg_ids) {
          const botMessage = botDdlChannel.messages.cache.get(msg_id);
          if (botMessage) {
            await botMessage.delete();
          }
        }
      }
    } catch (error) {
      this.gs.log(`[DISCORD_SERVICE-DELETE_ATTACHMMENT_ERROR] 🎉`, error, 'error');
    }
  }

  async sendAttachment(attachment: AttachmentModel, user: UserModel = null, chunkIdx = null): Promise<string> {
    let currentChunkIdx: number = 0;
    let chunkParent: string = attachment?.discord;
    let chunkSize = CONSTANTS.fileSizeAttachmentChunkDiscordLimit;
    const botGuild = this.bot ? this.bot.guilds.cache.get(environment.discord.guild_id) : null;
    if (botGuild) {
      const totalBoosts = botGuild.premiumSubscriptionCount;
      if (totalBoosts >= 14) {
        chunkSize = 100 * 1000 * 1000; // Level 3
      } else if (totalBoosts >= 7) {
        chunkSize = 50 * 1000 * 1000; // Level 2
      } else {
        chunkSize = CONSTANTS.fileSizeAttachmentChunkDiscordLimit;
      }
    }
    const crs = createReadStream(
      `${environment.uploadFolder}/${attachment.name}`,
      {
        highWaterMark: chunkSize
      }
    );
    for await (const c of crs) {
      let canUpload = true;
      if (chunkParent) {
        const ddlFileChunkUploadedCount = await this.ddlFileRepo.count({
          where: {
            msg_parent: Equal(chunkParent),
            chunk_idx: Equal(currentChunkIdx)
          }
        });
        if (ddlFileChunkUploadedCount > 0) {
          canUpload = false;
        }
      }
      if (canUpload) {
        if (chunkIdx === null || chunkIdx === currentChunkIdx) {
          let uploadTryCount = 1;
          while (uploadTryCount > 0) {
            if (uploadTryCount > CONSTANTS.retryDdlUploadMaxCount) {
              throw new Error('Gagal Upload Ke Discord!');
            }
            try {
              this.gs.log(`[DISCORD_SERVICE-CHUNK_${currentChunkIdx}_TRY_${uploadTryCount}] 🎉`, c.length);
              const botDdlChannel = this.bot ? (this.bot.channels.cache.get(environment.discord.channelDdlId) as NewsChannel) : null;
              if (botDdlChannel) {
                const msg = await botDdlChannel.send({
                  files: [new MessageAttachment(c, `${attachment.name}_${currentChunkIdx}`)]
                });
                const ddlFile = this.ddlFileRepo.new();
                ddlFile.msg_id = msg.id;
                if (currentChunkIdx === 0) {
                  chunkParent = msg.id;
                } else {
                  ddlFile.msg_parent = chunkParent;
                }
                ddlFile.chunk_idx = currentChunkIdx;
                ddlFile.user_ = attachment.user_ || user;
                ddlFile.id = msg.attachments.first().id;
                ddlFile.name = msg.attachments.first().name;
                ddlFile.url = msg.attachments.first().url;
                ddlFile.size = msg.attachments.first().size;
                ddlFile.mime = attachment.mime;
                await this.ddlFileRepo.save(ddlFile);
              }
              break;
            } catch (error) {
              this.gs.log(`[DISCORD_SERVICE-SEND_ATTACHMMENT_ERROR_${currentChunkIdx}_TRY_${uploadTryCount}] 🎉`, error, 'error');
              uploadTryCount++;
            }
          }
        }
      }
      if (chunkIdx !== null) {
        break;
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
        const botGuild = this.bot ? this.bot.guilds.cache.get(environment.discord.guild_id) : null;
        if (botGuild) {
          const botMember = botGuild.members.cache.get(this.bot.user.id);
          if (botMember) {
            botMember.setNickname(`${environment.siteName} - ${this.cfg.github?.sha?.slice(0, 7)}`);
          }
        }
      } else {
        throw new Error('Github API Error!');
      }
    } catch (error) {
      this.gs.log('[DISCORD_SERVICE-CHANGE_BOT_NICKNAME] 🎉', error, 'error');
    }
  }

  async verifyAccount(msg: Message): Promise<Message<boolean>> {
    try {
      const args = msg.content.split(' ');
      if (args.length >= 3 && args.length <= 4) {
        const decoded = this.cs.jwtDecode(args[2]);
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
            const laboratoryRatsRole = msg.guild.roles.cache.get(environment.discord.laboratoryRatsRoleId);
            if (!msg.member.roles.cache.has(laboratoryRatsRole.id)) {
              await msg.guild.members.cache.get(decoded.discord.id).roles.add(laboratoryRatsRole);
            }
            await msg.reply({ content: `<@${msg.author.id}> 😚 .: Berhasil :: ${user.username}@${environment.mailTrap.domain} :. 🤩` });
            return await (msg.guild.channels.cache.get(environment.discord.channelEventId) as TextChannel).send({
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
        return await msg.reply({ content: `<@${msg.author.id}> Siapa ya? Ini milik orang lain 🤔` });
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
      const sosmed = await this.sosmedRepo.findOneOrFail({
        where: [
          {
            id: Equal(member.user.id),
            type: SosMedModel.DISCORD
          }
        ],
        relations: ['user_']
      });
      const user = await this.userRepo.findOneOrFail({
        where: [
          {
            id: Equal(sosmed.user_.id),
            verified: true,
            role: Not(In([RoleModel.ADMIN, RoleModel.MODERATOR]))
          }
        ]
      });
      user.verified = false;
      user.role = RoleModel.USER;
      const resUserSave = await this.userRepo.save(user);
      const fansubMembers = await this.fansubMemberRepo.find({
        where: [
          {
            user_: {
              id: Equal(resUserSave.id)
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
