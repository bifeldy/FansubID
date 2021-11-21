import { Server } from 'socket.io';
import { Message, MessageEmbed, TextChannel } from 'discord.js';
import { Equal, getRepository } from 'typeorm';

import { environment } from '../../environments/server/environment';
import { SosMed } from '../../app/_shared/models/SosMed';

// Helper
import jwt from '../helpers/jwt';

import { User } from '../entities/User';

export async function discordBot(io: Server, msg: Message): Promise<Message> {
  if (msg.content === '~about') {
    return msg.channel.send(`<@${msg.author.id}> https://github.com/bifeldy/Hikki`);
  } else if (msg.content === '~ping') {
    const latency = new Date().getTime() - new Date(msg.createdTimestamp).getTime();
    return msg.channel.send(`<@${msg.author.id}> Pong ${latency} ms late!`);
  } else if (msg.content.startsWith('~verify ')) {
    const args = msg.content.split(' ');
    if (args.length >= 3 && args.length <= 4) {
      try {
        if (args[3] === 'DELETE_CHAT') {
          await msg.delete();
        }
        const decoded = jwt.JwtDecrypt(args[2]);
        if (decoded.discord.id === msg.author.id) {
          const userRepo = getRepository(User);
          const user = await userRepo.findOneOrFail({
            where: [
              { id: Equal(decoded.user.id) }
            ],
            relations: ['kartu_tanda_penduduk_', 'profile_']
          });
          if (user.verified) {
            return msg.channel.send(`<@${msg.author.id}> Akun sudah diverifikasi 😍 Yeay 🥰`);
          } else if (args[1] === SosMed.DISCORD) {
            user.verified = true;
            await userRepo.save(user);
            const laboratoryRatsRole = msg.guild.roles.cache.get(environment.laboratoryRatsRoleId);
            if (!msg.member.roles.cache.has(laboratoryRatsRole.id)) {
              await msg.guild.members.cache.get(decoded.discord.id).roles.add(laboratoryRatsRole);
            }
            await msg.channel.send(`<@${msg.author.id}> Berhasil 😚 Enjoy! 🤩`);
            return (msg.guild.channels.cache.get(environment.discordBotChannelEventId) as TextChannel).send(
              new MessageEmbed()
              .setColor('#43b581')
              .setTitle(user.kartu_tanda_penduduk_.nama)
              .setURL(`${environment.baseUrl}/user/${user.username}`)
              .setAuthor('Hikki - Verifikasi Pengguna', `${environment.baseUrl}/assets/img/favicon.png`, environment.baseUrl)
              .setDescription(user.profile_.description.replace(/<[^>]*>/g, ' ').trim())
              .setThumbnail(user.image_url === '/favicon.ico' ? `${environment.baseUrl}/assets/img/favicon.png` : user.image_url)
              .setTimestamp(user.updated_at)
              .setFooter(
                user.username,
                user.image_url === '/favicon.ico' ? `${environment.baseUrl}/assets/img/favicon.png` : user.image_url
              )
            );
          } else {
            throw new Error('Format Data Salah / Token Expired!');
          }
        } else {
          return msg.channel.send(`<@${msg.author.id}> Anda siapa ya? Ini milik orang lain 🤔`);
        }
      } catch (error) {
        console.error(error);
        return msg.channel.send(`<@${msg.author.id}> Format data salah atau token expired 🤔`);
      }
    } else {
      return msg.channel.send(`<@${msg.author.id}> Untuk verifikasi, kunjungi ${environment.baseUrl}/verify-discord 🤔`);
    }
  }
}
