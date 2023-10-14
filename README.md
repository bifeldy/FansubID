# <img src="src/assets/img/favicon.png" width="24px" /> [FansubID | Database Fansub Indonesia](https://www.fansub.id)

Proyek ini awalnya dibuat menggunakan [Angular CLI](https://github.com/angular/angular-cli) dengan versi 7.1.0 yaitu [PTI-TugasAkhir](https://github.com/bifeldy/PTI-TugasAkhir). <br />
=> Live Demo :: https://bifeldy.github.io/PTI-TugasAkhir (Archived).

> Ayo gabung di saluran kanal Discord kita! <br /> [![Chat on Discord](https://discordapp.com/api/guilds/342220398022098944/widget.png "Chat on Discord")](https://discord.gg/xGWdExk)

![](src/assets/img/banner/fansub.png)

## NodeJS *Cluster* :: *Multi CPU(s) Worker* ~

- [x] Sudah mendukung untuk berjalan di banyak CPU [*Master* & *Slave(s)*]
- [x] NestJS Cron / *Task Scheduler* hanya di *Master* saja (Tidak *Listen* HTTP)
- [x] Komunikasi *Slave(s)* ― *Master* via *Inter Process Communication* [IPC] + ada *Callback Function*
- [x] *Web Socket* [Socket.IO] *Event Broadcast* antar *Cluster*
- [x] *Mutual Exclusion* [Mutex] *Lock* antar *Cluster*

----

## Library *Ubuntu / Debian*

```sh
$ sudo apt install -y libx11-xcb1 libxcomposite1 libxcursor1 libxdamage1 libxi-dev libxtst-dev libnss3 libcups2 libxss1 libxrandr2 libasound2 libatk1.0-0 libatk-bridge2.0-0 libpangocairo-1.0-0 libgtk-3-0 libgbm1
```

## *Build & Run*

1. Buat salinan `secret.example.json` dengan nama `secret.json`. <br />
  Lengkapi data untuk *configurasi environment*.

2. Jalankan `npm run bifeldy:dev` untuk *serve* SSR dalam *development mode*. <br />
  Lalu buka situs di `http://localhost:4200` portnya dapat dilihat pada terminal.
  
3. Untuk perintah lainnya, misalnya `npm run bifeldy:lint` dapat dilihat pada berkas [package.json](package.json)

## Bantuan lebih lanjut

* Angular CLI menggunakan `ng help` atau kunjungi [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).  <br />
* NestJS menggunakan `nest --help` atau kunjungi [NestJS README](https://github.com/nestjs/nest/blob/master/Readme.md).

## Lisensi

Proyek ini berada di bawah Lisensi GNU General Public License v3.0 <br />
Harap melihat [LICENSE](LICENSE) untuk informasi tingkat lanjut.
