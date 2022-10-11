import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('profileBtn') profileBtn: any;

  usernameInput: any;
  emailInput: any;
  birthdateInput: any;

  user: any;

  constructor(private authService:AuthService, private httpService:HttpService, private router:Router) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (result) => {
        this.user = result.data;
        this.usernameInput = this.user.username;
        this.emailInput = this.user.email;
        this.birthdateInput = this.user.birthdate;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  logout()
  {
    this.authService.logoutUser();
    this.router.navigate(['login']);
  }

  editProfile(input: any)
  {
    console.log(input.value);
    this.authService.editProfile(input.value).subscribe({
      next: (result) => {
        this.user = result.data;
        this.profileBtn.nativeElement.click();
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
