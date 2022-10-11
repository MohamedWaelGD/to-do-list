import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AuthCheckLoggedInInterceptor } from './interceptors/auth-check-logged-in.interceptor';
import { AuthGuardInterceptor } from './interceptors/auth-guard.interceptor';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardInterceptor]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardInterceptor]
  },
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [AuthCheckLoggedInInterceptor]
  },
  {
    path: 'register',
    component: AuthComponent,
    canActivate: [AuthCheckLoggedInInterceptor]
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardInterceptor, AuthCheckLoggedInInterceptor]
})
export class AppRoutingModule { }
