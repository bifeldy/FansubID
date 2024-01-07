import { Injectable } from '@angular/core';
import { HammerGestureConfig } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MyHammerConfig extends HammerGestureConfig {

  override overrides = {
    pinch: {
      enable: false
    },
    rotate: {
      enable: false
    }
  };

}
