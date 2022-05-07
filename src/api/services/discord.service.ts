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
  EmbedFooterData
} from 'discord.js';

// NodeJS Library
import { URL } from 'node:url';

import { Injectable } from '@nestjs/common';
import { Equal } from 'typeorm';

import { environment } from '../../environments/api/environment';

import { SosMedModel } from '../../models/req-res.model';

import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { CryptoService } from './crypto.service';
import { GlobalService } from './global.service';
import { SocketIoService } from './socket-io.service';

import { UserService } from '../repository/user.service';

@Injectable()
export class DiscordService {

  bot: Client = null;

  constructor(
    private api: ApiService,
    private cfg: ConfigService,
    private cs: CryptoService,
    private gs: GlobalService,
    private sis: SocketIoService,
    private userRepo: UserService
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
        this.gs.log(`[${msg.guild.name}] 🎉 [${(msg.channel as TextChannel).name}] 🎉 [${msg.author.username}#${msg.author.discriminator}] 🎉 ${msg.content}`);
        this.handleMessage(msg).catch(e => this.gs.log('[DISCORD_SERVICE-HANDLE_MESSAGE] 🎉', e, 'error'));
      }
    });
    this.bot.once('ready', async () => {
      try {
        this.gs.log(`[DISCORD_SERVICE-READY] 🎉 ${this.bot.user.username}#${this.bot.user.discriminator} - ${this.bot.user.id} 🎶`);
        this.updateVisitor();
        const url = new URL(`https://api.github.com/repos/${environment.author}/${environment.siteName}/commits`);
        const res_raw = await this.api.get(url, environment.nodeJsXhrHeader);
        if (res_raw.ok) {
          const gh: any = await res_raw.json();
          this.cfg.github = gh[0];
          this.bot.guilds.cache.get(environment.discordGuildId)?.members.cache.get(this.bot.user.id)?.setNickname(`Hikki - ${this.cfg.github?.sha?.slice(0, 7)}`);
        } else {
          throw new Error('Github API Error');
        }
      } catch (error) {
        this.gs.log('[DISCORD_SERVICE-FAILED] 🎉', error, 'error')
        this.cfg.github = null;
      }
    });
    this.bot.login(environment.discordBotLoginToken).catch(err => this.gs.log('[DISCORD_SERVICE-LOGIN] 🎉', err, 'error'));
  }

  async updateVisitor(): Promise<any> {
    if (this.bot && this.sis.io) {
      this.bot?.user?.setPresence({
        status: 'idle',
        activities: [
          {
            name: `${this.sis.io.sockets.sockets.size} Pengunjung`,
            type: 'WATCHING',
            url: environment.baseUrl
          }
        ]
      });
    }
  }

  async sendNews(message: MessageOptions): Promise<void | Message<boolean>> {
    const botNewsChannel = this.bot ? (this.bot.channels.cache.get(environment.discordBotChannelEventId) as NewsChannel) : null;
    return botNewsChannel?.send(message).catch(err => this.gs.log('[DISCORD_SERVICE-SEND_NEWS] 🎉', err, 'error'));
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
            iconURL: setAuthor.iconURL === '/favicon.ico' ? `${environment.baseUrl}/assets/img/favicon.png` : setAuthor.iconURL,
            url: setAuthor.url
          })
          .setDescription(setDescription.replace(/<[^>]*>/g, ' ').trim())
          .setThumbnail(setThumbnail === '/favicon.ico' ? `${environment.baseUrl}/assets/img/favicon.png` : setThumbnail)
          .setTimestamp(setTimestamp)
          .setFooter({
            text: setFooter.text,
            iconURL: setFooter.iconURL === '/favicon.ico' ? `${environment.baseUrl}/assets/img/favicon.png` : setFooter.iconURL
          })
      ]
    };
  }

  async handleMessage(msg: Message): Promise<Message> {
    if (msg.content === '~about') {
      return msg.reply({ content: `<@${msg.author.id}> https://github.com/bifeldy/Hikki` });
    } else if (msg.content === '~ping') {
      const latency = new Date().getTime() - new Date(msg.createdTimestamp).getTime();
      return msg.reply({ content: `<@${msg.author.id}> Pong ${latency} ms late!` });
    } else if (msg.content.startsWith('~verify ')) {
      const args = msg.content.split(' ');
      if (args.length >= 3 && args.length <= 4) {
        try {
          if (args[3] === 'DELETE_CHAT') {
            await msg.delete();
          }
          const decoded = this.cs.jwtDecrypt(args[2]);
          if (decoded.discord.id === msg.author.id) {
            const user = await this.userRepo.findOneOrFail({
              where: [
                { id: Equal(decoded.user.id) }
              ],
              relations: ['kartu_tanda_penduduk_', 'profile_']
            });
            if (user.verified) {
              return msg.reply({ content: `<@${msg.author.id}> Akun sudah diverifikasi 😍 Yeay 🥰` });
            } else if (args[1] === SosMedModel.DISCORD) {
              user.verified = true;
              await this.userRepo.save(user);
              const laboratoryRatsRole = msg.guild.roles.cache.get(environment.laboratoryRatsRoleId);
              if (!msg.member.roles.cache.has(laboratoryRatsRole.id)) {
                await msg.guild.members.cache.get(decoded.discord.id).roles.add(laboratoryRatsRole);
              }
              await msg.reply({ content: `<@${msg.author.id}> Berhasil 😚 Enjoy! 🤩` });
              return (msg.guild.channels.cache.get(environment.discordBotChannelEventId) as TextChannel).send({
                embeds: [
                  new MessageEmbed()
                    .setColor('#43b581')
                    .setTitle(user.kartu_tanda_penduduk_.nama)
                    .setURL(`${environment.baseUrl}/user/${user.username}`)
                    .setAuthor({
                      name: 'Hikki - Verifikasi Pengguna',
                      iconURL: `${environment.baseUrl}/assets/img/favicon.png`,
                      url: environment.baseUrl
                    })
                    .setDescription(user.profile_.description.replace(/<[^>]*>/g, ' ').trim())
                    .setThumbnail(user.image_url === '/favicon.ico' ? `${environment.baseUrl}/assets/img/favicon.png` : user.image_url)
                    .setTimestamp(user.updated_at)
                    .setFooter({
                      text: user.username,
                      iconURL: user.image_url === '/favicon.ico' ? `${environment.baseUrl}/assets/img/favicon.png` : user.image_url
                    })
                ]
              });
            } else {
              throw new Error('Format Data Salah / Token Expired!');
            }
          } else {
            return msg.reply({ content: `<@${msg.author.id}> Anda siapa ya? Ini milik orang lain 🤔` });
          }
        } catch (error) {
          return msg.reply({ content: `<@${msg.author.id}> Format data salah atau token expired 🤔` });
        }
      } else {
        return msg.reply({ content: `<@${msg.author.id}> Untuk verifikasi, kunjungi ${environment.baseUrl}/verify-discord 🤔` });
      }
    } else {
      return msg.reply({ content: `<@${msg.author.id}> Perintah tidak sesuai, silahkan lihat ${environment.baseUrl}/documentation 💩` });
    }
  }

}
