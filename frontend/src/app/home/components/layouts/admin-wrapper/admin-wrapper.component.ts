import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { AdminToolbarComponent } from '../admin-toolbar/admin-toolbar.component';

@Component({
  selector: 'app-admin-wrapper',
  standalone: true,
  imports: [AdminSidebarComponent,AdminToolbarComponent,RouterOutlet],
  templateUrl: './admin-wrapper.component.html',
  styleUrl: './admin-wrapper.component.scss'
})
export class AdminWrapperComponent {

}
