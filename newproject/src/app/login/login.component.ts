import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {  HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
// import {CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit {
  // ping() {
  //   this.http.get('http://localhost:7788/user/login')
  //     .subscribe(data => console.log(data), err => console.log(err));
  // }


  private user={username: null, password :null};
  private nani;
 
 

  
  constructor(public router: Router, private http: HttpClient, private cookieService: CookieService, 
                  ) { }
  
  signin(){
  // this.router.navigate(["signin"]);
  // console.log(this.user);
 
  
  console.log("Successfully Signed in");

  this.http.post('http://localhost:7788/user/login', this.user).subscribe(success=>{
    console.log(success);
    this.nani=success;
    if(this.nani.length==0){
      alert('please enter valid data');

    }else {
      this.cookieService.set( 'user', this.user.username );
      //put some data to cache for 2 minutes (maxAge - in seconds)
      // this._cacheService.set('key', ['user'], {maxAge: 2 * 60});
      
      this.router.navigate(["signin"]);
    }
    
},error=>{
  console.log(error);
}
    
  );
  
}



ngOnInit() {
}




}
