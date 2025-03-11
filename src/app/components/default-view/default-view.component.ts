import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-view',
  templateUrl: './default-view.component.html',
  styleUrl: './default-view.component.css'
})
export class DefaultViewComponent {

  pageTitle = "Person Details";
  addPersonFormURL = '/add-person';
  constructor(private router: Router) {};

  addPersonOnClick($event: Event){
    console.log("Add person button is clicked");
    this.router.navigate([this.addPersonFormURL]);
  }
  
}
