import { Injectable } from '@angular/core';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private persons: Person[] = [];
  private static nextID = 1;

  //Adding new person with auto generated ID
  addPerson(person: Person) {
    const newPerson = new Person(
      PersonService.nextID++,
      person.name,
      person.phone,
      person.address,
      person.city,
      person.state,
      person.zip
    );
    this.persons.push(newPerson);
  }

  //To get all stored persons
  getPersons(): Person[] {
    return this.persons;
  }

  //Deleting a person by ID
  deletePerson(id: number) : void{
    this.persons = this.persons.filter(p => p.id != id);
  }

  //Updating person details by ID
  updatePerson(updatedPerson: Person){
    const index = this.persons.findIndex(p => p.id === updatedPerson.id);
    if(index !== -1){
      this.persons[index] = updatedPerson;
    }
  }
}
