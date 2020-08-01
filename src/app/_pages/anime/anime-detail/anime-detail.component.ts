import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anime-detail',
  templateUrl: './anime-detail.component.html',
  styleUrls: ['./anime-detail.component.css']
})
export class AnimeDetailComponent implements OnInit {

  banner = 'https://cdn.myanimelist.net/images/anime/1444/108005.jpg';

  url = 'https://myanimelist.net/anime/39587/Re_Zero_kara_Hajimeru_Isekai_Seikatsu_2nd_Season';
  title = 'Re:Zero kara Hajimeru Isekai Seikatsu 2nd Season';
  description = 'Even after dying countless times, Subaru finally ended the threat of the White Whale and defeated the Witch Cult\'s Sin Archbishop representing sloth, Petelgeuse Romaneeconti. But only shortly after overcoming a tragic ending and reuniting with his beloved Emilia, Subaru learns that Rem has been erased from this world, having fallen victim to the White Whale\'s Fog of Elimination in the midst of Subaru\'s death loop. With the White Whale now gone, Subaru and Emilia are forced to confront a reality they never dreamed would happen. (Source: Crunchyroll)';
  status = 'Currently Airing';
  episodes = 13;
  score = 8.48;
  rank = 107;
  popularity = 331;

  genres = [
    { mal_id: 8, type: 'anime', name: 'Drama', url: 'https://myanimelist.net/anime/genre/8/Drama' },
    { mal_id: 10, type: 'anime', name: 'Fantasy', url: 'https://myanimelist.net/anime/genre/10/Fantasy' },
    { mal_id: 40, type: 'anime', name: 'Psychological', url: 'https://myanimelist.net/anime/genre/40/Psychological' },
    { mal_id: 41, type: 'anime', name: 'Thriller', url: 'https://myanimelist.net/anime/genre/41/Thriller' }
  ];

  tabData = [
    {
      name: 'Daftar Fansub',
      icon: 'closed_caption',
      type: 'grid',
      data: [
        { title: 'Fansub 01 Long Name', description: 'http://01' },
        { title: 'Fansub 02 Long Name', description: 'http://02' },
        { title: 'Fansub 03 Long Name', description: 'http://03' },
        { title: 'Fansub 04 Long Name', description: 'http://04' },
        { title: 'Fansub 05 Long Name', description: 'http://05' },
        { title: 'Fansub 06 Long Name', description: 'http://06' },
        { title: 'Fansub 07 Long Name', description: 'http://07' },
        { title: 'Fansub 08 Long Name', description: 'http://08' },
        { title: 'Fansub 09 Long Name', description: 'http://09' },
        { title: 'Fansub 10 Long Name', description: 'http://10' },
        { title: 'Fansub 11 Long Name', description: 'http://11' },
        { title: 'Fansub 12 Long Name', description: 'http://12' },
        { title: 'Fansub 13 Long Name', description: 'http://13' },
        { title: 'Fansub 14 Long Name', description: 'http://14' },
        { title: 'Fansub 15 Long Name', description: 'http://15' },
        { title: 'Fansub 16 Long Name', description: 'http://16' },
        { title: 'Fansub 17 Long Name', description: 'http://17' },
        { title: 'Fansub 18 Long Name', description: 'http://18' },
        { title: 'Fansub 19 Long Name', description: 'http://19' },
        { title: 'Fansub 20 Long Name', description: 'http://20' }
      ]
    },
    {
      name: 'Berkas Terkait',
      icon: 'file_copy',
      type: 'table',
      data: [
        { title: 'Berkas_01.mkv', description: 'Berkas Description 01 With Very Long Text ...', author: 'Bifeldy', createdAt: '12:34:56 AM JST+9' },
        { title: 'Berkas_02.mkv', description: 'Berkas Description 02 With Very Long Text ...', author: 'Bifeldy', createdAt: '12:34:56 AM JST+9' },
        { title: 'Berkas_03.mkv', description: 'Berkas Description 03 With Very Long Text ...', author: 'Bifeldy', createdAt: '12:34:56 AM JST+9' },
        { title: 'Berkas_04.mkv', description: 'Berkas Description 04 With Very Long Text ...', author: 'Bifeldy', createdAt: '12:34:56 AM JST+9' },
        { title: 'Berkas_05.mkv', description: 'Berkas Description 05 With Very Long Text ...', author: 'Bifeldy', createdAt: '12:34:56 AM JST+9' },
        { title: 'Berkas_06.mkv', description: 'Berkas Description 06 With Very Long Text ...', author: 'Bifeldy', createdAt: '12:34:56 AM JST+9' },
        { title: 'Berkas_07.mkv', description: 'Berkas Description 07 With Very Long Text ...', author: 'Bifeldy', createdAt: '12:34:56 AM JST+9' },
        { title: 'Berkas_08.mkv', description: 'Berkas Description 08 With Very Long Text ...', author: 'Bifeldy', createdAt: '12:34:56 AM JST+9' },
        { title: 'Berkas_09.mkv', description: 'Berkas Description 09 With Very Long Text ...', author: 'Bifeldy', createdAt: '12:34:56 AM JST+9' },
        { title: 'Berkas_10.mkv', description: 'Berkas Description 10 With Very Long Text ...', author: 'Bifeldy', createdAt: '12:34:56 AM JST+9' }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  openMAL(linkAddress: string): void {
    window.open(linkAddress, '_blank');
  }

}
