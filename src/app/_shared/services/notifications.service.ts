import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  public bannerImg = null;
  public sizeContain = false;
  public bgRepeat = false;

  constructor() { }

}
