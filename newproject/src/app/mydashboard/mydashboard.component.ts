import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {  HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-mydashboard',
  templateUrl: './mydashboard.component.html',
  styleUrls: ['./mydashboard.component.css']
})
export class MydashboardComponent implements OnInit {

private userdata;

private username;

  constructor(public router: Router, private cookieService: CookieService, private http: HttpClient) {
    this.username=this.cookieService.get('user');
    if(this.username==''){
      this.router.navigate(['login']);
    }
   }
getUserData(user){
  this.http.post('http://localhost:7788/user/view', {username:user}).subscribe(success=>{
    console.log(success);
    this.userdata=success;
},error=>{
  console.log(error);
}
    
  );

}
  
logout(){
  alert('logout');
  this.cookieService.deleteAll();
  this.router.navigate(['logout']);
}
// signin(){
// this.router.navigate(["signin"]);
  

  ngOnInit() {
    this.getUserData(this.username);
  }
 
 

}
