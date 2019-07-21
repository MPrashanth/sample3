import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {  HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  private userdata
  ={firstname:null, lastname:null, email:null, phone:null, username:null, password:null};
  private username;
            


  constructor(public router: Router, private http : HttpClient,  private cookieService: CookieService) { 

    this.username=this.cookieService.get('user');
    if(this.username==''){
      this.router.navigate(['login']);
    }
  }



  editmyprofile(){ 
    console.log(this.userdata);
    // 
    this.http.post('http://localhost:7788/user/edit', this.userdata).subscribe(success=>{
      console.log(success);
      this.router.navigate(["editmyprofile"]);
      
  },error=>{
   
    console.log(error);
    this.router.navigate(["editmyprofile"]);
  }
      
    );
  
  }
    
   
  

  getUserData(user){
    this.http.post('http://localhost:7788/user/view', {username:user}).subscribe(success=>{
      console.log(success);
      this.userdata;
  },error=>{
    console.log(error);
  }
      
    );
  
  }
    
  

  ngOnInit() {
    this.getUserData(this.username);
  }

}
