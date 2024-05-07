import { Routes } from '@angular/router';
import { AddCourseComponent } from './components/admin/course/add-course/add-course.component';
import { CourseComponent } from './components/admin/course/course.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EditCourseComponent } from './components/admin/course/edit-course/edit-course.component';
import { UnitComponent } from './components/admin/unit/unit.component';
import { SidebarMenuAdminComponent } from './components/admin/sidebar-menu-admin/sidebar-menu-admin.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { AddUnitComponent } from './components/admin/unit/add-unit/add-unit.component';
import { EditUnitComponent } from './components/admin/unit/edit-unit/edit-unit.component';
import { LessonComponent } from './components/admin/lesson/lesson.component';
import { AddLessonComponent } from './components/admin/lesson/add-lesson/add-lesson.component';
import { EditLessonComponent } from './components/admin/lesson/edit-lesson/edit-lesson.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'courses', component: CourseComponent },
    { path: 'courses/add', component: AddCourseComponent },
    { path: 'courses/:id/edit', component: EditCourseComponent },
    { path: 'units', component: UnitComponent },
    { path: 'units/add', component: AddUnitComponent },
    { path: 'units/:id/edit', component: EditUnitComponent },
    { path: 'teste', component: SidebarMenuAdminComponent },
    { path: 'main', component: SidebarMenuComponent },
    { path: 'lessons', component: LessonComponent },
    { path: 'lessons/add', component: AddLessonComponent },
    { path: 'lessons/:id/edit', component: EditLessonComponent },
    { path: 'questions', component: LessonComponent },

];
