import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PersonService } from '../services/person.service';

export interface Person {
  id: number;
  name: string;
  age: number;
  address: string;
  phone_no: number;
}

@Component({
  selector: 'app-person-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.scss',
})
export class PersonFormComponent {
  personForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private router: Router
  ) {
    this.personForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      address: ['', Validators.required],
      phone_no: ['', Validators.required],
    });

    this.personForm.valueChanges.subscribe(() => {
      if (this.personForm.valid) {
        this.errorMessage = '';
      }
    });
  }

  onSubmit() {
    if (this.personForm.invalid) {
      this.errorMessage = 'Please fill all required fields.';
      this.successMessage = '';
      return;
    }

    const formData: Person = this.personForm.value;

    this.personService.createPerson(formData).subscribe({
      next: () => {
        this.successMessage = 'Data saved successfully!';
        this.errorMessage = '';
        this.personForm.reset();
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: () => {
        this.errorMessage = 'Failed to save data. Please try again.';
        this.successMessage = '';
      },
    });
  }
  onCancel() {
    this.router.navigate(['/home']);
  }
}
