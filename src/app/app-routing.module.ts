import { RegisterComponent } from './account/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './account/login/login.component';

const routes: Routes = 
[
  { path: '', component: HomeComponent },
  { path: 'account/register', component: RegisterComponent },
  { path: 'account/login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
