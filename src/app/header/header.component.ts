import { CommonModule, } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatProgressBarModule,
        MatDivider
    ],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
     @Output() menuClicked = new EventEmitter<void>();



}
