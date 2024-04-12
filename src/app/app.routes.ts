import { Routes } from '@angular/router';
import { AddCourseComponent } from './components/admin/course/add-course/add-course.component';
import { CourseComponent } from './components/admin/course/course.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EditCourseComponent } from './components/admin/course/edit-course/edit-course.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'courses', component: CourseComponent },
    { path: 'courses/add', component: AddCourseComponent },
    { path: 'courses/:id/edit', component: EditCourseComponent }
];
