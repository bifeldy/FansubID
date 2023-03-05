import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CONSTANTS } from '../../../../../constants';

import { DialogInputDataModel } from '../../../models/Dialog';

import { GlobalService } from '../../../../_shared/services/global.service';

@Component({
  selector: 'app-material-dialog-input',
  templateUrl: './material-dialog-input.component.html',
  styleUrls: ['./material-dialog-input.component.css']
})
export class MaterialDialogInputComponent implements OnInit {

  fg: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogInputDataModel,
    private fb: FormBuilder,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  get DATA(): DialogInputDataModel {
    return this.data;
  }

  get BALIKAN(): any {
    return this.fg.value;
  }

  ngOnInit(): void {
    this.gs.log('[DIALOG_DATA_IN]', this.data);
    const dataFormGroup = {};
    for (const [key, value] of Object.entries(this.data.input)) {
      const defVal = [Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)];
      if (value['inputRequired']) {
        defVal.push(Validators.required);
      }
      dataFormGroup[key] = [null, Validators.compose(defVal)];
    }
    this.fg = this.fb.group(dataFormGroup);
  }

}
