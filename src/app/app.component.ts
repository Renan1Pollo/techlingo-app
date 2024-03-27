import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarMenuComponent } from "./components/sidebar-menu/sidebar-menu.component";
import { LoginComponent } from './components/login/login.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, SidebarMenuComponent, LoginComponent]
})
export class AppComponent {
  title = 'techlingo-app';
}
