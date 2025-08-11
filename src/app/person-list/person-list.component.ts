import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
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
  selector: 'app-person-list',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.scss'
})
export class PersonListComponent  implements AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'age', 'address', 'phone_no'];
 dataSource = new MatTableDataSource<Person>([]);


 totalRecords = 0;

   @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private rout:ActivatedRoute,
    private router:Router,
    private personService: PersonService){
 }

  ngOnInit() {
    // Load initial data from resolver or fallback to API call
    const resolvedData = this.rout.snapshot.data['persons'];
    if (resolvedData) {
      this.dataSource.data = resolvedData.data;
      this.totalRecords = resolvedData.total;
    } else {
      this.loadPersons(0, 5);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    // Listen for paginator changes and load new data
    this.paginator.page.subscribe(() => {
      this.loadPersons(this.paginator.pageIndex, this.paginator.pageSize);
    });
  }

  loadPersons(pageIndex: number, pageSize: number) {
    this.personService.getPersons(pageIndex, pageSize).subscribe(res => {
      this.dataSource.data = res.data;
      this.totalRecords = res.total;
    });
  }

  goToAddPerson() {
    this.router.navigate(['/person-form']);
  }
}
