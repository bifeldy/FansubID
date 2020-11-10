import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats-server',
  templateUrl: './stats-server.component.html',
  styleUrls: ['./stats-server.component.css']
})
export class StatsServerComponent implements OnInit {

  bandwidth = 979220000;
  diskUsage = 285550000;
  iNodes = 509;
  activeDdl = 1;
  visitor = 2;

  constructor() {
  }

  ngOnInit(): void {
  }

}
