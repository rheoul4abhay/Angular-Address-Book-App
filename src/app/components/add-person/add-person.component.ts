import { Person } from '../../models/person';
import { PersonService } from '../../services/person.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-person.component.html',
  styleUrl: './add-person.component.css',
})
export class AddPersonComponent {
  defaultPageURL = 'http://localhost:4200/';
  formTitle = 'Person Address Form';
  person: Person = { id: 0, name: '', phone: '', address: '', city: '', state: '', zip: '' };

  // Error messages object for dynamic tracking
  errorMessages: { [key: string]: string } = {};

  // Regex patterns for validation
  private regexPatterns: Record<Exclude<keyof Person, 'id'>, RegExp> = {
    name: /^[A-Z][a-zA-Z\s]{2,}$/,
    phone: /^\+?([0-9]{1,3}[-.])?[0-9]{10}$/,
    address: /^[A-Za-z0-9,.-\s]{4,}$/,
    zip: /^[1-9][0-9]{5}$/,
    city: /^[A-Za-z0-9\s]{2,}$/,
    state: /^[A-Za-z0-9\s]{2,}$/,
  };

  // Static error messages for validation
  private staticErrorMessages: Record<Exclude<keyof Person, 'id'>, string> = {
    name: 'Name should start with a capital letter and contain at least 3 characters.',
    phone: 'Invalid phone number',
    address: 'Must contain at least 4 valid characters',
    zip: 'Invalid zip code',
    city: 'Must contain at least 2 characters',
    state: 'Must contain at least 2 characters',
  };

  // Initializing person service
  constructor(private personService: PersonService, private cdRef: ChangeDetectorRef) {}

  handleBackClick($event: Event) {
    console.log('Back click button is working');
    window.open(this.defaultPageURL, '_self');
  }

  // Form validation
  onInput(event: Event, fieldName: Exclude<keyof Person, 'id'>): void {
    const inputValue = (event.target as HTMLInputElement).value;
    const value = inputValue.trim();

    // Validate first, then assign value if valid
    if (inputValue.trim() === '') {
      this.errorMessages[fieldName] = 'This field cannot be empty or contain only spaces.';
    } else if (!this.regexPatterns[fieldName].test(value) && value !== '') {
      this.errorMessages[fieldName] = this.staticErrorMessages[fieldName];
    } else {
      delete this.errorMessages[fieldName];
    }

    // Assign value after validation
    this.person[fieldName] = value;
  }

  onSubmit(form: NgForm): void {
    // Mark all fields as touched to trigger validation messages
    Object.values(form.controls).forEach((control) => {
      control.markAsTouched();
    });

    // Check for regex violations and update errorMessages
    let isFormValid = true;

    Object.keys(this.regexPatterns).forEach((fieldName) => {
      const key = fieldName as Exclude<keyof Person, 'id'>; // Explicitly cast to the correct type
      const value = this.person[key] as string;

      if (!this.regexPatterns[key].test(value)) {
        this.errorMessages[key] = this.staticErrorMessages[key]; // Access using the correct type
        isFormValid = false;
      } else {
        delete this.errorMessages[key]; // Access using the correct type
      }
    });

    // Check if the form is invalid (either due to Angular validation or regex violations)
    if (form.invalid || !isFormValid) {
      console.warn('Form is invalid. Please correct the following fields:');

      // Log invalid fields to the console for debugging
      Object.keys(form.controls).forEach((key) => {
        const control = form.controls[key];
        if (control.invalid) {
          console.warn(`- ${key}: ${control.errors ? JSON.stringify(control.errors) : 'Invalid'}`);
        }
      });
      return; // Stop form submission if invalid
    }

    // Proceed with submission if valid
    console.log('Form submitted:', this.person);
    this.personService.addPerson(this.person);
    form.resetForm(); // Reset the form
    this.errorMessages = {}; // Clear all custom error messages
  }

  // Method to handle form reset
  onReset(form: NgForm): void {
    form.resetForm(); // Reset the form and its state
    this.errorMessages = {}; // Clear all custom error messages
    this.person = { id: 0, name: '', phone: '', address: '', city: '', state: '', zip: '' }; // Reset the person object
  }
}