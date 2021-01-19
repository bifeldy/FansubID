import { Component, OnInit } from '@angular/core';

import * as wanakana from 'wanakana';

import { GlobalService } from '../../../_shared/services/global.service';
import { DialogService } from '../../../_shared/services/dialog.service';

@Component({
  selector: 'app-hirakata',
  templateUrl: './hirakata.component.html',
  styleUrls: ['./hirakata.component.css']
})
export class HirakataComponent implements OnInit {

  modeTampilan = 'hiragana';

  daftarHuruf = {
    standard: {
      a: [
        {
          path: 'a',
          hiragana: 'あ'
        },
        {
          path: 'i',
          hiragana: 'い'
        },
        {
          path: 'u',
          hiragana: 'う'
        },
        {
          path: 'e',
          hiragana: 'え'
        },
        {
          path: 'o',
          hiragana: 'お'
        }
      ],
      k: [
        {
          path: 'ka',
          hiragana: 'か'
        },
        {
          path: 'ki',
          hiragana: 'き'
        },
        {
          path: 'ku',
          hiragana: 'く'
        },
        {
          path: 'ke',
          hiragana: 'け'
        },
        {
          path: 'ko',
          hiragana: 'こ'
        }
      ],
      s: [
        {
          path: 'sa',
          hiragana: 'さ'
        },
        {
          path: 'shi',
          hiragana: 'し'
        },
        {
          path: 'su',
          hiragana: 'す'
        },
        {
          path: 'se',
          hiragana: 'せ'
        },
        {
          path: 'so',
          hiragana: 'そ'
        }
      ],
      t: [
        {
          path: 'ta',
          hiragana: 'た'
        },
        {
          path: 'chi',
          hiragana: 'ち'
        },
        {
          path: 'tsu',
          hiragana: 'つ'
        },
        {
          path: 'te',
          hiragana: 'て'
        },
        {
          path: 'to',
          hiragana: 'と'
        }
      ],
      n: [
        {
          path: 'na',
          hiragana: 'な'
        },
        {
          path: 'ni',
          hiragana: 'に'
        },
        {
          path: 'nu',
          hiragana: 'ぬ'
        },
        {
          path: 'ne',
          hiragana: 'ね'
        },
        {
          path: 'no',
          hiragana: 'の'
        }
      ],
      h: [
        {
          path: 'ha',
          hiragana: 'は'
        },
        {
          path: 'hi',
          hiragana: 'ひ'
        },
        {
          path: 'fu',
          hiragana: 'ふ'
        },
        {
          path: 'he',
          hiragana: 'へ'
        },
        {
          path: 'ho',
          hiragana: 'ほ'
        }
      ],
      m: [
        {
          path: 'ma',
          hiragana: 'ま'
        },
        {
          path: 'mi',
          hiragana: 'み'
        },
        {
          path: 'mu',
          hiragana: 'む'
        },
        {
          path: 'me',
          hiragana: 'め'
        },
        {
          path: 'mo',
          hiragana: 'も'
        }
      ],
      y: [
        {
          path: 'ya',
          hiragana: 'や'
        },
        null,
        {
          path: 'yu',
          hiragana: 'ゆ'
        },
        null,
        {
          path: 'yo',
          hiragana: 'よ'
        }
      ],
      r: [
        {
          path: 'ra',
          hiragana: 'ら'
        },
        {
          path: 'ri',
          hiragana: 'り'
        },
        {
          path: 'ru',
          hiragana: 'る'
        },
        {
          path: 're',
          hiragana: 'れ'
        },
        {
          path: 'ro',
          hiragana: 'ろ'
        }
      ],
      w: [
        {
          path: 'wa',
          hiragana: 'わ'
        },
        null,
        {
          path: 'wo',
          hiragana: 'を'
        },
        null,
        {
          path: 'n',
          hiragana: 'ん'
        }
      ]
    },
    dakuon: {
      g: [
        {
          path: 'ga',
          hiragana: 'が'
        },
        {
          path: 'gi',
          hiragana: 'ぎ'
        },
        {
          path: 'gu',
          hiragana: 'ぐ'
        },
        {
          path: 'ge',
          hiragana: 'げ'
        },
        {
          path: 'go',
          hiragana: 'ご'
        }
      ],
      z: [
        {
          path: 'za',
          hiragana: 'ざ'
        },
        {
          path: 'ji',
          hiragana: 'じ'
        },
        {
          path: 'zu',
          hiragana: 'ず'
        },
        {
          path: 'ze',
          hiragana: 'ぜ'
        },
        {
          path: 'zo',
          hiragana: 'ぞ'
        }
      ],
      d: [
        {
          path: 'da',
          hiragana: 'だ'
        },
        {
          path: 'dji',
          hiragana: 'ぢ'
        },
        {
          path: 'dzu',
          hiragana: 'づ'
        },
        {
          path: 'de',
          hiragana: 'で'
        },
        {
          path: 'do',
          hiragana: 'ど'
        }
      ],
      b: [
        {
          path: 'ba',
          hiragana: 'ば'
        },
        {
          path: 'bi',
          hiragana: 'び'
        },
        {
          path: 'bu',
          hiragana: 'ぶ'
        },
        {
          path: 'be',
          hiragana: 'べ'
        },
        {
          path: 'bo',
          hiragana: 'ぼ'
        }
      ],
    },
    handakuon: {
      p: [
        {
          path: 'pa',
          hiragana: 'ぱ'
        },
        {
          path: 'pi',
          hiragana: 'ぴ'
        },
        {
          path: 'pu',
          hiragana: 'ぷ'
        },
        {
          path: 'pe',
          hiragana: 'ぺ'
        },
        {
          path: 'po',
          hiragana: 'ぽ'
        }
      ]
    },
    yuon: {
      ky: [
        {
          path: 'kya',
          hiragana: 'きゃ'
        },
        {
          path: 'kyu',
          hiragana: 'きゅ'
        },
        {
          path: 'kyo',
          hiragana: 'きょ'
        }
      ],
      sh: [
        {
          path: 'sha',
          hiragana: 'しゃ'
        },
        {
          path: 'shu',
          hiragana: 'しゅ'
        },
        {
          path: 'sho',
          hiragana: 'しょ'
        }
      ],
      ch: [
        {
          path: 'cha',
          hiragana: 'ちゃ'
        },
        {
          path: 'chu',
          hiragana: 'ちゅ'
        },
        {
          path: 'cho',
          hiragana: 'ちょ'
        }
      ],
      ny: [
        {
          path: 'nya',
          hiragana: 'にゃ'
        },
        {
          path: 'nyu',
          hiragana: 'にゅ'
        },
        {
          path: 'nyo',
          hiragana: 'にょ'
        }
      ],
      hy: [
        {
          path: 'hya',
          hiragana: 'ひゃ'
        },
        {
          path: 'hyu',
          hiragana: 'ひゅ'
        },
        {
          path: 'hyo',
          hiragana: 'ひょ'
        }
      ],
      my: [
        {
          path: 'mya',
          hiragana: 'みゃ'
        },
        {
          path: 'myu',
          hiragana: 'みゅ'
        },
        {
          path: 'myo',
          hiragana: 'みょ'
        }
      ],
      ry: [
        {
          path: 'rya',
          hiragana: 'りゃ'
        },
        {
          path: 'ryu',
          hiragana: 'りゅ'
        },
        {
          path: 'ryo',
          hiragana: 'りょ'
        }
      ],
      gy: [
        {
          path: 'gya',
          hiragana: 'ぎゃ'
        },
        {
          path: 'gyu',
          hiragana: 'ぎゅ'
        },
        {
          path: 'gyo',
          hiragana: 'ぎょ'
        }
      ],
      j: [
        {
          path: 'ja',
          hiragana: 'じゃ'
        },
        {
          path: 'ju',
          hiragana: 'じゅ'
        },
        {
          path: 'jo',
          hiragana: 'じょ'
        }
      ],
      by: [
        {
          path: 'bya',
          hiragana: 'びゃ'
        },
        {
          path: 'byu',
          hiragana: 'びゅ'
        },
        {
          path: 'byo',
          hiragana: 'びょ'
        }
      ],
      py: [
        {
          path: 'pya',
          hiragana: 'ぴゃ'
        },
        {
          path: 'pyu',
          hiragana: 'ぴゅ'
        },
        {
          path: 'pyo',
          hiragana: 'ぴょ'
        }
      ]
    }
  };

  constructor(
    private gs: GlobalService,
    private ds: DialogService
  ) {
  }

  ngOnInit(): void {
  }

  changeModeTampilan(data): void {
    this.gs.log('[HIRAKATA_CHANGE_KANA]', data);
    this.modeTampilan = data;
  }

  openDmak(kana): void {
    this.gs.log('[HIRAKATA_OPEN_DMAK]', kana);
    this.ds.openDmakDialog({
      data: {
        romaji: kana.path,
        hiragana_katakana_kanji: (
          this.modeTampilan === 'hiragana' ?　kana.hiragana :　wanakana.toKatakana(kana.hiragana)
        )
      },
      disableClose: false
    });
  }

}
