import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {  HttpClient, HttpHeaders} from '@angular/common/http';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private userregistration={};

  constructor(public router: Router, private http: HttpClient) { }
  
  submitregister() {
    this.router.navigate(["submitregister"]);
    console.log(this.userregistration);
    console.log("successfully registered");
    this.http.post('http://localhost:7788/user/registration', this.userregistration).subscribe(success=>{
    console.log(success);
    console.log("Registered");
},error=>{
  console.log(error);
}
    
  );
  }
  

  ngOnInit() {
  }


}
