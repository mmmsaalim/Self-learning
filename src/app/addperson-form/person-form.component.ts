import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.scss',
})
export class PersonFormComponent {
  personForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  personId: number | null = null;
  isViewMode = false;

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Initialize form
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

    this.route.params.subscribe(params => {
      const id = params['id'];
      this.isViewMode = this.route.snapshot.url.some(segment => segment.path === 'view');

      if (id) {
        this.personId = +id;
        this.loadPersonData(this.personId);
      }
    });
  }

  loadPersonData(id: number) {
    this.personService.getPersonById(id).subscribe({
      next: (person: Person) => {
        this.personForm.patchValue(person);
        this.personForm.disable();
      },
      error: () => {
        this.errorMessage = 'Failed to load person details.';
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
      next: (savedperson) => {
        this.successMessage = 'Data saved successfully!';
        this.errorMessage = '';
        this.personForm.patchValue(savedperson);
        this.personForm.disable();
        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/person-list']);
        }, 3000);
      },
      error: () => {
        this.errorMessage = 'Failed to save data. Please try again.';
        this.successMessage = '';
      },
    });
  }

  onCancel() {
    this.router.navigate(['/person-list']);
  }

  isValid(field: string): boolean {
    const control = this.personForm.get(field);
    return !!(control && control.invalid && control.touched);
  }
}
