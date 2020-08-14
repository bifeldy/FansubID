import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit, OnDestroy {

  returnUrl = '/';

  timedOut = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';
    if (this.returnUrl) {
      this.timedOut = setTimeout(() => {
        this.router.navigateByUrl(this.returnUrl);
      }, 3000);
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.timedOut);
  }

}
