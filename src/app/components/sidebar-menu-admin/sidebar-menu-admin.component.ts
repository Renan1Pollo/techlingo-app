import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-menu-admin',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-menu-admin.component.html',
  styleUrl: './sidebar-menu-admin.component.scss',
})
export class SidebarMenuAdminComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
