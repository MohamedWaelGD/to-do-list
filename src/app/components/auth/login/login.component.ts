import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMsg!: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(login: NgForm) {
    if (login.valid) {
      this.authService.loginUser(login.value).subscribe(
        {
          next: (result) => {
            this.authService.saveUserToken(result.data, login.value.remember);
            this.router.navigate(['home']);
          },
          error: (e) => {
            console.log(e);
            this.errorMsg = e.error.message;
          }
        });
    }
  }
}

