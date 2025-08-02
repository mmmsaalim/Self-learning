import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

export interface Person {
  id: number;
  name: string;
  age: number;
  address: string;
  phone_no: number;
}
@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [MatTableModule,MatMenuModule,MatButtonModule,MatIconModule],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.scss'
})
export class PersonListComponent {

  displayedColumns: string[] = ['id', 'name', 'age', 'address', 'phone_no','action'];
  dataSource: Person[] = [];

  constructor(private rout:ActivatedRoute,private router:Router){
  this.dataSource= this.rout.snapshot.data['persons'];
 }

  goToAddPerson() {
    this.router.navigate(['/person-form']);
  }

  viewperson(person : Person){
    this.router.navigate(['/person-form','view',person.id]);
  }
}
