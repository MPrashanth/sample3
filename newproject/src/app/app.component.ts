import { Component, ViewEncapsulation } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./bootstrap.css','./app.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppComponent {
  
  title = 'app';
}
