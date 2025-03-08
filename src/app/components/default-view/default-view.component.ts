import { Component } from '@angular/core';

@Component({
  selector: 'app-default-view',
  imports: [],
  templateUrl: './default-view.component.html',
  styleUrl: './default-view.component.css'
})
export class DefaultViewComponent {

  addPersonPageURL = 'http://localhost:4200/addPerson';
  pageTitle = "Person Details";
  
  addPersonOnClick($event: Event){
    console.log("Add person button is clicked");
    window.open(this.addPersonPageURL, "_self");
  }
  
}
