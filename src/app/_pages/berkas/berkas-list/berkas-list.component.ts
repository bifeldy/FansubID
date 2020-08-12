import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-berkas-list',
  templateUrl: './berkas-list.component.html',
  styleUrls: ['./berkas-list.component.css']
})
export class BerkasListComponent implements OnInit {

  constructor(
    private router: Router
  ) {
    this.router.navigateByUrl('/home');
  }

  ngOnInit(): void {
  }

}
