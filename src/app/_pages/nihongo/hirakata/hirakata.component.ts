import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../../_shared/services/global.service';

@Component({
  selector: 'app-hirakata',
  templateUrl: './hirakata.component.html',
  styleUrls: ['./hirakata.component.css']
})
export class HirakataComponent implements OnInit {

  modeTampilan = 'hiragana';

  daftarHuruf = {
    standard: {
      a: ['a', 'i', 'u', 'e', 'o'],
      k: ['ka', 'ki', 'ku', 'ke', 'ko'],
      s: ['sa', 'shi', 'su', 'se', 'so'],
      t: ['ta', 'chi', 'tsu', 'te', 'to'],
      n: ['na', 'ni', 'nu', 'ne', 'no'],
      h: ['ha', 'hi', 'fu', 'he', 'ho'],
      m: ['ma', 'mi', 'mu', 'me', 'mo'],
      y: ['ya', null, 'yu', null, 'yo'],
      r: ['ra', 'ri', 'ru', 're', 'ro'],
      w: ['wa', null, 'wo', null, 'n']
    },
    dakuon: {
      g: ['ga', 'gi', 'gu', 'ge', 'go'],
      z: ['za', 'ji', 'zu', 'ze', 'zo'],
      d: ['da', 'dji', 'dzu', 'de', 'do'],
      b: ['ba', 'bi', 'bu', 'be', 'bo'],
    },
    handakuon: {
      p: ['pa', 'pi', 'pu', 'pe', 'po']
    },
    yuon: {
      ky: ['kya', 'kyu', 'kyo'],
      sh: ['sha', 'shu', 'sho'],
      ch: ['cha', 'chu', 'cho'],
      ny: ['nya', 'nyu', 'nyo'],
      hy: ['hya', 'hyu', 'hyo'],
      my: ['mya', 'myu', 'myo'],
      ry: ['rya', 'ryu', 'ryo'],
      gy: ['gya', 'gyu', 'gyo'],
      j: ['ja', 'ju', 'jo'],
      by: ['bya', 'byu', 'byo'],
      py: ['pya', 'pyu', 'pyo']
    }
  };

  constructor(
    private gs: GlobalService
  ) {
  }

  ngOnInit(): void {
  }

  changeModeTampilan(data): void {
    this.gs.log('[HIRAKATA_CHANGE_KANA]', data);
    this.modeTampilan = data;
  }

}
