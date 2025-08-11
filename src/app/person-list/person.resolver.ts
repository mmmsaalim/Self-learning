import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PersonService } from '../services/person.service';
import { Person } from './person-list.component';

export const personResolver: ResolveFn<{data: Person[], total:number}> = () => {
const personService = inject(PersonService);
return personService.getPersons(0, 5);
};
