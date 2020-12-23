import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogInfoData } from '../../../models/Dialog';

@Component({
  selector: 'app-material-dialog-info',
  templateUrl: './material-dialog-info.component.html',
  styleUrls: ['./material-dialog-info.component.css']
})
export class MaterialDialogInfoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogInfoData
  ) {
  }

  ngOnInit(): void {
  }

}
