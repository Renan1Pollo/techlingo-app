import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenuAdminComponent } from '../../../components/sidebar-menu-admin/sidebar-menu-admin.component';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../types/Course.type';

@Component({
  selector: 'app-course',
  standalone: true,
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
  imports: [SidebarMenuAdminComponent, CommonModule],
})
export class CourseComponent implements OnInit {
  response!: Boolean;
  courses!: Course[];

  constructor(private router: Router, private service: CourseService) {}

  ngOnInit(): void {
    this.getCourseData();
  }

  addCourse(): void {
    this.router.navigate(['admin/courses/add']);
  }

  editCourse(courseId: number): void {
    this.router.navigate(['admin/courses', courseId, 'edit']);
  }

  deleteCourse(courseId: number): void {
    this.response = confirm('Você tem certeza que deseja excluir esse Curso?');

    if (this.response) {
      this.service.deleteCourse(courseId).subscribe(() => {
        alert('Curso excluído!');
        this.getCourseData();
      });
    }
  }

  getCourseData(): void {
    this.courses = [];
    this.service.getAllCourses().subscribe((data: Course[]) => {
      this.courses = data;
    });
  }
}
