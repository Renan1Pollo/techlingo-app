import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenuAdminComponent } from '../sidebar-menu-admin/sidebar-menu-admin.component';

@Component({
  selector: 'app-course',
  standalone: true,
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
  imports: [SidebarMenuAdminComponent],
})
export class CourseComponent {
  response!: Boolean;
  constructor(private router: Router) {}

  addCourse(): void {
    this.router.navigate(['/courses/add']);
  }

  editCourse(courseId: number): void {
    this.router.navigate(['/courses', courseId, 'edit']);
  }

  deleteCourse(courseId: number): void {
    this.response = confirm('Você tem certeza que deseja excluir esse Curso?');

    if (this.response) {
      console.log('Excluido');
    }
  }
}
