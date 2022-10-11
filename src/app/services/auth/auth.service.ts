import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private router: Router) { }

  registerUser(inputData: any): Observable<any>
  {
    var url = env.API_URL + "Auth/register";
    return this.http.post(url, inputData);
  }

  loginUser(inputData: any): Observable<any>
  {
    var url = env.API_URL + "Auth/login";
    return this.http.post(url, inputData);
  }

  saveUserToken(token: string, isRemember: any)
  {
    if (isRemember === false || isRemember === '')
      sessionStorage.setItem('Token', token);
    else
      localStorage.setItem('Token', token);
  }

  getUserToken(): any
  {
    if (localStorage.getItem('Token'))
      return localStorage.getItem('Token');

    return sessionStorage.getItem("Token");
  }

  getProfile(): Observable<any>
  {
    var url = env.API_URL + "Users";

    return this.http.get(url);
  }

  editProfile(input: any): Observable<any>
  {
    var url = env.API_URL + "Users";

    return this.http.put(url, input);
  }

  logoutUser()
  {
    sessionStorage.removeItem("Token");
    localStorage.removeItem("Token");
  }
}
