import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
// import {CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegistersuccessComponent } from './registersuccess/registersuccess.component';
import { MydashboardComponent } from './mydashboard/mydashboard.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { LogoutComponent } from './logout/logout.component';
import { EditsuccessComponent } from './editsuccess/editsuccess.component';
import { PasswordComponent } from './password/password.component';

const myRouting: Routes = [
  { path: 'login', component: LoginComponent, },
  { path: 'register', component: RegisterComponent}, 
  { path: 'submitregister', component: RegistersuccessComponent},
  { path: 'signin', component: MydashboardComponent},
  
  { path: 'gotologin', component: LoginComponent},
  { path: 'editprofile', component: EditprofileComponent},
  { path: 'changepassword', component: ChangepasswordComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'editmyprofile', component: EditsuccessComponent},
  { path: 'changemypassword', component: PasswordComponent},
  
  { path: 'gotodashboard', component: MydashboardComponent}

    
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RegistersuccessComponent,
    MydashboardComponent,
    EditprofileComponent,
    ChangepasswordComponent,
    LogoutComponent,
    EditsuccessComponent,
    PasswordComponent 
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(myRouting), HttpClientModule, FormsModule],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
