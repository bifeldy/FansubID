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
  MessageAttachment,
  CommandInteraction
} from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

// NodeJS Library
import cluster from 'node:cluster';
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
import { ClusterMasterSlaveService } from './cluster-master-slave.service';

@Injectable()
export class DiscordService {

  bot: Client = null;

  constructor(
    private cms: ClusterMasterSlaveService,
    private api: ApiService,
    private cfg: ConfigService,
    private cs: CryptoService,
    private gs: GlobalService,
    private userRepo: UserService,
    private fansubMemberRepo: FansubMemberService,
    private ddlFileRepo: DdlFileService,
    private sosmedRepo: SocialMediaService
  ) {
    // if (environment.production) {
      this.setupBot();
      if (cluster.isMaster) {
        this.setupSlash();
      }
      if (cluster.isWorker) {
        this.startBot();
      }
    // }
  }

  async cfgGithubSet(data): Promise<void> {
    if (cluster.isMaster) {
      this.cfg.githubSet(data);
    } else {
      await this.cms.sendMessageToMaster('CFG_GITHUB_SET', data);
    }
  }

  /** */

  async setupSlash(): Promise<this> {
    try {
      const rest = new REST({ version: '9' }).setToken(environment.discord.loginToken);
      const globalCommands = [
        new SlashCommandBuilder().setName('about').setDescription('FansubID Information ~'),
        new SlashCommandBuilder().setName('ping').setDescription('Pong!')
      ].map(command => command.toJSON());
      await rest.put(
        Routes.applicationCommands(environment.discord.client_id),
        {
          body: globalCommands
        }
      );
      const fsidCommands = [
        new SlashCommandBuilder().setName('verify').setDescription('FansubID Account Verification')
          .addStringOption(option => option.setName('app_token').setDescription('App Token Verifikasi'))
      ].map(command => command.toJSON());
      await rest.put(
        Routes.applicationGuildCommands(environment.discord.client_id, environment.discord.guild_id),
        {
          body: fsidCommands
        }
      );
      this.gs.log('[DISCORD_SLASH_COMMAND-SUCCESS] 🎉', [...globalCommands, ...fsidCommands]);
    } catch (error) {
      this.gs.log('[DISCORD_SLASH_COMMAND-FAILED] 🎉', error, 'error');
    }
    return this;
  }

  setupBot(): void {
    this.bot = new Client({
      restRequestTimeout: CONSTANTS.timeDiscord,
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
    if (cluster.isMaster) {
      this.bot.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;
        this.gs.log(`[${interaction.guild.name}] 🎉 [${(interaction.channel as TextChannel).name}] [${interaction.user.username}#${interaction.user.discriminator}] ${interaction.commandName} 🎶`);
        this.handleInteraction(interaction);
      });
      this.bot.on('messageCreate', (msg: Message) => {
        if (msg.channel.id === environment.discord.channelBotId && msg.content.startsWith('~')) {
          this.gs.log(`[${msg.guild.name}] 🎉 [${(msg.channel as TextChannel).name}] [${msg.author.username}#${msg.author.discriminator}] ${msg.content} 🎶`);
          this.handleMessage(msg);
        }
      });
    }
    this.bot.on('ready', async () => {
      try {
        this.gs.log(`[DISCORD_SERVICE-READY] 🎉 ${this.bot.user.username}#${this.bot.user.discriminator} - ${this.bot.user.id} 🎶`);
        if (cluster.isMaster) {
          await this.changeBotNickname();
          // await this.recoverAndFindMessageByAttachmentCrawl();
        }
      } catch (error) {
        this.gs.log('[DISCORD_SERVICE-FAILED] 🎉', error, 'error');
      }
    });
    this.bot.on('guildMemberRemove', async member => {
      this.gs.log(`[DISCORD_SERVICE-MEMBER_LEAVE] 🎉 ${member.user.username}#${member.user.discriminator} - ${member.user.id} 🎶`);
      this.memberLeftRemoveVerifiedDemote(member);
    });
  }

  async startBot(): Promise<void> {
    try {
      await this.bot?.login(environment.discord.loginToken);
    } catch (error) {
      this.gs.log('[DISCORD_SERVICE-LOGIN] 🎉', error, 'error');
    }
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

  // async recoverAndFindMessageByAttachmentCrawl(): Promise<void> {
  //   try {
  //     const ddl = await this.ddlFileRepo.query(`
  //       SELECT msg_id, MAX(chunk_idx) AS max
  //       FROM public.ddl_file
  //       WHERE msg_id IN (
  //         SELECT DISTINCT msg_id
  //         FROM public.ddl_file
  //         WHERE msg_id = msg_parent
  //       )
  //       GROUP BY msg_id
  //     `);
  //     for (const d of ddl) {
  //       let lastMessageId = d.msg_id;
  //       for (let i = 0; i < d.max; i++) {
  //         const chnl = await this.bot.channels.fetch(environment.discord.channelDdlId);
  //         const res = await (chnl as NewsChannel).messages.fetch({ after: lastMessageId, limit: 1 });
  //         const kys = res.keys();
  //         for (const k of kys) {
  //           const msg = res.get(k);
  //           lastMessageId = msg.id;
  //           const att = msg.attachments?.first();
  //           if (att) {
  //             this.gs.log('[DISCORD_SERVICE-ATTACHMMENT_MESSAGE_CRAWLER] 🎉', `${att.id} => ${att.name} :: ${msg.id}`);
  //             const dfrs = await this.ddlFileRepo.find({
  //               where: [
  //                 { id: Equal(att.id) }
  //               ]
  //             });
  //             if (dfrs.length === 1) {
  //               const dfr = dfrs[0];
  //               if (dfr.msg_id !== msg.id) {
  //                 dfr.msg_id = msg.id;
  //                 await this.ddlFileRepo.save(dfr);
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     this.gs.log(`[DISCORD_SERVICE-ATTACHMMENT_MESSAGE_CRAWLER] 🎉`, error, 'error');
  //   }
  // }

  async getMessageAttachment(msg_id: string): Promise<Message<boolean>> {
    const botDdlChannel = this.bot ? (this.bot.channels.cache.get(environment.discord.channelDdlId) as NewsChannel) : null;
    if (botDdlChannel) {
      // Fore Re-Fresh `.fetch()`
      return await botDdlChannel.messages.fetch(msg_id);
    }
    return null;
  }

  async deleteAttachment(msg_ids: string[]): Promise<void> {
    try {
      for (const msg_id of msg_ids) {
        const botMessage = await this.getMessageAttachment(msg_id);
        if (botMessage) {
          await botMessage.delete();
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
    // Fore Re-Fresh `.fetch()`
    const botGuild = this.bot ? await this.bot.guilds.fetch(environment.discord.guild_id) : null;
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
                let newUrl = msg.attachments.first().url;
                if (newUrl.endsWith('&') || newUrl.endsWith('/') || newUrl.endsWith('?')) {
                  newUrl = newUrl.substring(0, newUrl.length - 1);
                }
                ddlFile.url = newUrl;
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

  async handleInteraction(interaction: CommandInteraction): Promise<void> {
    try {
      if (interaction.commandName === 'about') {
        await interaction.reply({ content: `<@${interaction.user.id}> https://github.com/${environment.author}/${environment.siteName}` });
      } else if (interaction.commandName === 'ping') {
        const latency = Date.now() - new Date(interaction.createdTimestamp).getTime();
        await interaction.reply({ content: `<@${interaction.user.id}> Pong ${latency} ms late!` });
      } else if (interaction.commandName === 'verify') {
        const appToken = interaction.options.getString('app_token');
        const args = appToken?.split(' ');
        if (args?.length >= 2 && args?.length <= 3) {
          await this.verifyAccount(args, interaction.user.id, interaction);
        } else {
          await interaction.reply({ content: `<@${interaction.user.id}> Untuk verifikasi, kunjungi ${environment.baseUrl}/verify-discord 🤔` });
        }
      } else {
        await interaction.reply({ content: `<@${interaction.user.id}> Perintah tidak sesuai, silahkan lihat ${environment.baseUrl}/docs dan ${environment.baseUrl}/api` });
      }
    } catch (error) {
      this.gs.log('[DISCORD_SERVICE-HANDLE_INTERACTION] 🎉', error, 'error');
    }
  }

  async handleMessage(msg: Message): Promise<void> {
    try {
      if (msg.content) {
        if (msg.content === '~about') {
          await msg.reply({ content: `<@${msg.author.id}> https://github.com/${environment.author}/${environment.siteName}` });
        } else if (msg.content === '~ping') {
          const latency = Date.now() - new Date(msg.createdTimestamp).getTime();
          await msg.reply({ content: `<@${msg.author.id}> Pong ${latency} ms late!` });
        } else if (msg.content.startsWith('~verify ')) {
          const args = msg.content.split(' ');
          args.reverse();
          args.pop();
          args.reverse();
          if (args.length >= 2 && args.length <= 3) {
            await this.verifyAccount([args[1], args[2]], msg.author.id, msg);
          } else {
            await msg.reply({ content: `<@${msg.author.id}> Untuk verifikasi, kunjungi ${environment.baseUrl}/verify-discord 🤔` });
          }
        } else {
          await msg.reply({ content: `<@${msg.author.id}> Perintah tidak sesuai, silahkan lihat ${environment.baseUrl}/docs dan ${environment.baseUrl}/api` });
        }
        if (msg.content.includes('DELETE_CHAT')) {
          await msg.delete();
        }
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
        const data = {
          sha: gh[0]?.sha,
          commit: {
            author: {
              date: gh[0]?.commit?.author?.date
            },
            message: gh[0]?.commit?.message
          }
        };
        await this.cfgGithubSet(data);
        const botGuild = this.bot ? this.bot.guilds.cache.get(environment.discord.guild_id) : null;
        if (botGuild) {
          const botMember = botGuild.members.cache.get(this.bot.user.id);
          if (botMember) {
            botMember.setNickname(`${environment.siteName} - ${this.cfg.githubGet()?.sha?.slice(0, 7)}`);
          }
        }
      } else {
        throw new Error('Github API Error!');
      }
    } catch (error) {
      this.gs.log('[DISCORD_SERVICE-CHANGE_BOT_NICKNAME] 🎉', error, 'error');
    }
  }

  async verifyAccount(appToken: string[], userAuthorId: string, interactionMessage): Promise<void> {
    try {
      const decoded = this.cs.jwtDecode(appToken[1]);
      if (decoded.discord.id === userAuthorId) {
        const user = await this.userRepo.findOneOrFail({
          where: [
            { id: Equal(decoded.user.id) }
          ],
          relations: ['kartu_tanda_penduduk_', 'profile_']
        })
        if (user.verified) {
          return await interactionMessage.reply({ content: `<@${userAuthorId}> Akun sudah diverifikasi 😍 Yeay 🥰` });
        } else if (appToken[0] === SosMedModel.DISCORD) {
          if (!decoded.discord.verified) {
            return await interactionMessage.reply({ content: `<@${userAuthorId}> Akun discord belum terverifikasi 🤔` });
          }
          user.verified = true;
          await this.userRepo.save(user);
          const laboratoryRatsRole = interactionMessage.guild.roles.cache.get(environment.discord.laboratoryRatsRoleId);
          const member = interactionMessage.guild.members.cache.get(userAuthorId);
          if (!member.roles.cache.has(laboratoryRatsRole.id)) {
            await member.roles.add(laboratoryRatsRole);
          }
          (interactionMessage.guild.channels.cache.get(environment.discord.channelEventId) as TextChannel).send({
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
          return await interactionMessage.reply({ content: `<@${userAuthorId}> 😚 .: Berhasil :: ${user.username}@${environment.mailTrap.domain} :. 🤩` });
        }
        throw new Error('Format Data Salah / Token Expired!');
      }
      return await interactionMessage.reply({ content: `<@${userAuthorId}> Siapa ya? Ini milik orang lain 🤔` });
    } catch (error) {
      try {
        return await interactionMessage.reply({ content: `<@${userAuthorId}> Format data salah atau token expired 🤔` });
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
