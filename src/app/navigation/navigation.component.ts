import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-navigation',
  standalone: true,
    imports: [
      HeaderComponent,
      CommonModule,
      RouterModule,
      MatSidenavModule,
      MatListModule,
      MatToolbarModule,
      MatButtonModule,
      MatIconModule,
    ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
 isSidenavOpened = true;
}
