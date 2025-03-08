import { Component } from '@angular/core';

@Component({
  selector: 'app-add-person',
  imports: [],
  templateUrl: './add-person.component.html',
  styleUrl: './add-person.component.css'
})
export class AddPersonComponent {

  defaultPageURL = 'http://localhost:4200/';
  formTitle = "Person Address Form";
  
  handleBackClick($event: Event){
    console.log("Back click button is working");
    window.open(this.defaultPageURL, "_self");
  }
  
}
