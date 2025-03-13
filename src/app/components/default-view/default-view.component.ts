import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from '../../models/person';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-default-view',
  standalone: true,
  imports: [CommonModule], // For *ngIf and *ngFor
  templateUrl: './default-view.component.html',
  styleUrl: './default-view.component.css'
})
export class DefaultViewComponent {

  pageTitle = "Person Details";
  addPersonFormURL = '/add-person';
  persons: Person[] = [];
  constructor(private router: Router, private personService: PersonService) {};

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.persons = this.personService.getPersons();
  }

  addPersonOnClick($event: Event){
    console.log("Add person button is clicked");
    this.router.navigate([this.addPersonFormURL]);
  }
  
}
