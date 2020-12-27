import { Server } from 'socket.io';
import { Message, MessageEmbed, TextChannel } from 'discord.js';
import { Equal, getRepository } from 'typeorm';

import { environment } from '../../environments/server/environment';
import { SosMed } from '../../app/_shared/models/SosMed';

// Helper
import jwt from '../helpers/jwt';

import { User } from '../entities/User';

// tslint:disable-next-line: typedef
export async function discordBot(io: Server, msg: Message) {
  if (msg.content === '~ping') {
    msg.channel.send(`<@${msg.author.id}> Pong ${new Date().getTime() - new Date(msg.createdTimestamp).getTime()} ms!`);
  } else if (msg.content.startsWith('~verify ')) {
    const args = msg.content.split(' ');
    if (args.length >= 3 && args.length <= 4) {
      try {
        if (args[3] === 'DELETE_CHAT') {
          await msg.delete();
        }
        const decoded = jwt.JwtDecrypt(args[2]);
        const userRepo = getRepository(User);
        const user = await userRepo.findOneOrFail({
          where: [
            { id: Equal(decoded.user.id) }
          ],
          relations: ['kartu_tanda_penduduk_', 'profile_']
        });
        if (user.verified) {
          await msg.channel.send(`<@${msg.author.id}> Akun sudah diverifikasi 😍 Yeay 🥰`);
        }
        if (args[1] === SosMed.DISCORD) {
          if (decoded && 'id' in decoded.discord) {
            if (decoded.discord.id === msg.author.id) {
              user.verified = true;
              await userRepo.save(user);
              const laboratoryRatsRole = msg.guild.roles.cache.get(environment.laboratoryRatsRoleId);
              if (!msg.member.roles.cache.has(laboratoryRatsRole.id)) {
                await msg.guild.members.cache.get(decoded.discord.id).roles.add(laboratoryRatsRole);
              }
              await msg.channel.send(`<@${msg.author.id}> Berhasil 😚 Enjoy! 🤩`);
              await (msg.guild.channels.cache.get(environment.discordBotChannelEventId) as TextChannel).send(
                new MessageEmbed()
                .setColor('#43b581')
                .setTitle(user.kartu_tanda_penduduk_.nama)
                .setURL(`${environment.baseUrl}/user/${user.username}`)
                .setAuthor('Hikki - Verifikasi Pengguna', `${environment.baseUrl}/assets/img/favicon.png`, environment.baseUrl)
                .setDescription(user.profile_.description.replace(/<[^>]*>/g, '').trim())
                .setThumbnail(user.image_url === '/favicon.ico' ? `${environment.baseUrl}/assets/img/favicon.png` : user.image_url)
                .setTimestamp(user.updated_at)
                .setFooter(user.id)
              );
            } else {
              await msg.channel.send(`<@${msg.author.id}> Anda siapa ya? Ini milik orang lain 🤔`);
            }
          } else {
            throw new Error('Format Data Salah / Token Expired!');
          }
        }
        // TODO :: If Other SosMed
      } catch (error) {
        console.error(error);
        await msg.channel.send(`<@${msg.author.id}> Format data salah atau token expired 🤔`);
      }
    }
  }
}
