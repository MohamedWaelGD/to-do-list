import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  router!: string;

  constructor(private _router: Router) {
    this.router = this._router.url;
  }

  ngOnInit(): void {
  }

}
