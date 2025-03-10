import { Person } from '../../models/person';
import { PersonService } from '../../services/person.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-person.component.html',
  styleUrl: './add-person.component.css'
})
export class AddPersonComponent {
  defaultPageURL = '/';
  formTitle = "Person Address Form";
  person: Person = { id: 0, name: "", phone: "", address: "", city: "", state: "", zip: "" };
  
  // Error messages object for dynamic tracking
  errorMessages: { [key: string]: string } = {};
  
  //To Track if input fields have been touched or interacted with
  touchedFields: Record<Exclude<keyof Person, 'id'>, boolean> = {
    name: false,
    phone: false,
    address: false,
    city: false,
    state: false,
    zip: false
  };

  // Regex patterns for validation
  private regexPatterns: Record<Exclude<keyof Person, 'id' | 'city' | 'state'>, RegExp> = {
    name: /^[A-Z][a-zA-Z\s]{2,}$/,
    phone: /^\+?([0-9]{1,3}[-.])?[0-9]{10}$/,
    address: /^[A-Za-z0-9,.-\s]{4,}$/,
    zip: /^[1-9][0-9]{5}$/
  };

  // Static error messages for validation
  private staticErrorMessages: Record<Exclude<keyof Person, 'id' | 'city' | 'state'>, string> = {
    name: 'Name should start with a capital letter and contain at least 3 characters.',
    phone: 'Invalid phone number',
    address: 'Must contain at least 4 valid characters',
    zip: 'Invalid zip code'
  };

  constructor(private personService: PersonService) {}

  //Back Click handling
  handleBackClick($event: Event) {
    console.log('Back click button is working');
    window.open(this.defaultPageURL, '_self');
  }

  //For Real-time validation as user types
  onInput(event: Event, fieldName: Exclude<keyof Person, 'id' | 'city' | 'state'>): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    
    // Mark field as touched when user interacts with it
    this.touchedFields[fieldName] = true;
    
    //Update the model with latest value
    this.person[fieldName] = value;
    
    //To validate field in real time 
    this.validateField(fieldName, value);
  }
  
  // Separate validation method for better organization
  validateField(fieldName: Exclude<keyof Person, 'id' | 'city' | 'state'>, value: string): void {
    const trimmedValue = value.trim();
    
    if (trimmedValue === '') {
      this.errorMessages[fieldName] = 'This field is required';
    } else if (!this.regexPatterns[fieldName].test(trimmedValue)) {
      this.errorMessages[fieldName] = this.staticErrorMessages[fieldName];
    } else {
      delete this.errorMessages[fieldName];
    }
  }

  //To check if the form is fully valid
  validateAllFields(): boolean {
    let isValid = true;
    
    // Fields to be validated
    const fieldsToValidate = ['name', 'phone', 'address', 'zip'];
    
    // Validate each field
    for (const field of fieldsToValidate) {
      // @ts-ignore - To Tell TypeScript to ignore this potential type error
      this.touchedFields[field] = true;
      
      // @ts-ignore - Tell TypeScript to ignore this potential type error
      const value = (this.person[field] || '').trim();
      
      //Excluding keys of id, city and state below as they are not a part of the validation
      this.validateField(field as Exclude<keyof Person, 'id' | 'city' | 'state'>, value);
      
      if (this.errorMessages[field]) {
        isValid = false;
      }
    }
    
    return isValid;
  }

  onSubmit(form: NgForm): void {
    // Mark all fields as touched to trigger validation messages(shorthand way to the code above)
    Object.keys(this.touchedFields).forEach(field => {
      this.touchedFields[field as keyof typeof this.touchedFields] = true;
    });

    const isFormValid = this.validateAllFields();

    // Check if the form is invalid
    if (!isFormValid) {
      console.warn('Form is invalid. Please correct the errors.');
      return;
    }

    // Create a clean copy of the person object with trimmed values if the form is valid
    const cleanPerson: Person = {
      ...this.person,
      name: this.person.name.trim(),
      phone: this.person.phone.trim(),
      address: this.person.address.trim(),
      city: this.person.city.trim(),
      state: this.person.state.trim(),
      zip: this.person.zip.trim()
    };

    console.log('Form submitted:', cleanPerson);
    this.personService.addPerson(cleanPerson);
    
    // Reset the form so we can continue the process for next user from scratch
    this.onReset(form);
  }

  // Method to handle form reset
  onReset(form: NgForm): void {
    this.person = { id: 0, name: '', phone: '', address: '', city: '', state: '', zip: '' };
    form.resetForm(this.person);
    this.errorMessages = {}; 
    this.touchedFields = {
      name: false,
      phone: false,
      address: false,
      city: false,
      state: false,
      zip: false
    };
  }
}