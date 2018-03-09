import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ValidateService } from './services/validate.service'
import { FlashMessagesModule } from 'angular2-flash-messages'
import { FlashMessagesService } from 'angular2-flash-messages'

const routes: Routes = [
    {path:'', component: HomeComponent },
    {path:'register', component: RegisterComponent },
    {path:'login', component: LoginComponent },
    {path:'dashboard', component: DashboardComponent },
    {path:'profile', component: ProfileComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    FlashMessagesModule.forRoot()
  ],
  providers: [
    ValidateService,
    FlashMessagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
