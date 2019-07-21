import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  userpassword = {username: null, oldpassword :null, newpassword :null};
  mani;

  constructor(public router: Router, private http: HttpClient, private cookieService: CookieService ) { }
  changemypassword() {
    // this.router.navigate(["changemypassword"]);
    
    this.http.post('http://localhost:7788/user/changepassword', this.userpassword).subscribe(success=>{
      console.log(success);
      
  },error=>{
    console.log(error);
  }
      
    );
    }
    
  

  ngOnInit() {
  }

}
