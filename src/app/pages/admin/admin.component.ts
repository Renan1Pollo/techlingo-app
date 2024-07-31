import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarMenuAdminComponent } from "../../components/sidebar-menu-admin/sidebar-menu-admin.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  imports: [RouterOutlet, SidebarMenuAdminComponent],
})
export class AdminComponent {}
