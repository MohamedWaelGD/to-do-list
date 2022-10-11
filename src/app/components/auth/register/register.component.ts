import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRegister } from 'src/app/models/auth';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService:AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(register: NgForm)
  {
    if (register.valid === true)
    {
      this.authService.registerUser(register.value).subscribe(result => {
        console.log(result);
        this.router.navigate(['login']);
      });
    }
  }

}
