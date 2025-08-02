import { Routes } from '@angular/router';
import { PersonFormComponent } from './addperson-form/person-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { PersonListComponent } from './person-list/person-list.component';
import { personResolver } from './person-list/person.resolver';
export const routes: Routes = [
    { path: 'home',
        component: HomeComponent
    },
    { path: 'dashboard',
        component: DashboardComponent
    },
    { path: 'person-form',
        component: PersonFormComponent
    },
    {
    path: 'person-form/view/:id',
    component: PersonFormComponent
    },
    {path : 'person-list',
        component: PersonListComponent,
        resolve: {persons: personResolver},
    },

];

