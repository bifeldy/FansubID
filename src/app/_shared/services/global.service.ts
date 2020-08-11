import { Injectable, isDevMode } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  readonly allKeyboardKeysRegex = /^[a-zA-Z0-9~`!@#\$%\^&\*\(\)_\-\+={\[\}\]\|\\:;"'<,>\.\?\/  \n]*$/;

  public bannerImg = null;
  public sizeContain = false;
  public bgRepeat = false;

  constructor() {
  }

  log(message: string, data: any = null, type: string = 'log'): void {
    if (isDevMode()) {
      if (type === 'log') {
        if (data) {
          console.log(message, data);
        } else {
          console.log(message);
        }
      } else if (type === 'error') {
        console.error(message, data);
      }
    }
  }

  getDirtyValues(formGroup: FormGroup): any {
    const dirtyValues = {};
    for (const control of Object.keys(formGroup.controls)) {
      const currentControl = formGroup.get(control);
      if (currentControl.dirty) {
        dirtyValues[control] = currentControl.value;
      }
    }
    return dirtyValues;
  }

  get randomColor(): any {
    // tslint:disable-next-line: no-bitwise
    return (Math.random() * 0xFFFFFF << 0).toString(16);
  }
}
