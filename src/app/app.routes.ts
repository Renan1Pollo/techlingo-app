import { Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { AddCourseComponent } from './pages/admin/course/add-course/add-course.component';
import { CourseComponent } from './pages/admin/course/course.component';
import { EditCourseComponent } from './pages/admin/course/edit-course/edit-course.component';
import { AddLessonComponent } from './pages/admin/lesson/add-lesson/add-lesson.component';
import { EditLessonComponent } from './pages/admin/lesson/edit-lesson/edit-lesson.component';
import { LessonComponent } from './pages/admin/lesson/lesson.component';
import { AddQuestionComponent } from './pages/admin/question/add-question/add-question.component';
import { EditQuestionComponent } from './pages/admin/question/edit-question/edit-question.component';
import { QuestionComponent } from './pages/admin/question/question.component';
import { AddUnitComponent } from './pages/admin/unit/add-unit/add-unit.component';
import { EditUnitComponent } from './pages/admin/unit/edit-unit/edit-unit.component';
import { UnitComponent } from './pages/admin/unit/unit.component';
import { HomeComponent } from './pages/home/home.component';
import { LearnComponent } from './pages/learn/learn.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'learn', component: LearnComponent },

  { path: 'admin', component: AdminComponent },
  { path: 'courses', component: CourseComponent },
  { path: 'courses/add', component: AddCourseComponent },
  { path: 'courses/:id/edit', component: EditCourseComponent },

  { path: 'units', component: UnitComponent },
  { path: 'units/add', component: AddUnitComponent },
  { path: 'units/:id/edit', component: EditUnitComponent },

  { path: 'lessons', component: LessonComponent },
  { path: 'lessons/add', component: AddLessonComponent },
  { path: 'lessons/:id/edit', component: EditLessonComponent },

  { path: 'questions', component: QuestionComponent },
  { path: 'questions/add', component: AddQuestionComponent },
  { path: 'questions/:id/edit', component: EditQuestionComponent },

  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
