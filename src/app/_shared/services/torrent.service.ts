import { Injectable } from '@angular/core';

import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class TorrentService {

  tableDataColumn: any = [
    'name',
    'size',
    'downloaded',
    'uploaded',
    'downSpeed',
    'upSpeed',
    'progress',
    'ETA',
    'peers',
    'ratio'
  ];

  tableDataRow: any = [
    // {
    //   position: 1,
    //   name: 'Hydrogen',
    //   weight: 1.0079,
    //   symbol: 'H',
    //   description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
    // },
    // {
    //   position: 2,
    //   name: 'Helium',
    //   weight: 4.0026,
    //   symbol: 'He',
    //   description: `Helium is a chemical element with symbol He and atomic number 2. It is a colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas group in the periodic table. Its boiling point is the lowest among all the elements.`
    // },
    // {
    //   position: 3,
    //   name: 'Lithium',
    //   weight: 6.941,
    //   symbol: 'Li',
    //   description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft, silvery-white alkali metal. Under standard conditions, it is the lightest metal and the lightest solid element.`
    // }
  ];

  constructor(
    public gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

}
