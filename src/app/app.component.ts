import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
//import { HeaderComponent } from './header/header.component';
//import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
@Component({
    selector: 'app-root',
    imports: [  RouterModule, NavigationComponent,],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'user-form-fe';
}
