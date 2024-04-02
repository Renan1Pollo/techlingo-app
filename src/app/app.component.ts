import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarMenuComponent } from "./components/sidebar-menu/sidebar-menu.component";
import { LoginComponent } from './components/login/login.component';
import { InputComponent } from './shared/input/input.component';
import { FormGroup } from '@angular/forms';
import { RegisterComponent } from "./components/register/register.component";
import { CourseComponent } from './components/admin/course/course.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, SidebarMenuComponent, LoginComponent, InputComponent, RegisterComponent, CourseComponent]
})
export class AppComponent {
  title = 'techlingo-app';
}
