import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  constructor(public router: Router) { }
  // gotodashboard(){
  //   console.log(["gotodashboard"]);
  // }

  ngOnInit() {
  }

}
