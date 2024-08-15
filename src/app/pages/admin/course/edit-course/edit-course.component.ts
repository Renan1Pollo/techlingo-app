import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarMenuAdminComponent } from '../../../../components/sidebar-menu-admin/sidebar-menu-admin.component';
import { CourseService } from '../../../../services/course.service';
import { InputComponent } from '../../../../shared/input/input.component';
import { Course } from '../../../../types/Course.type';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss'],
  imports: [InputComponent, SidebarMenuAdminComponent, CommonModule],
})
export class EditCourseComponent implements OnInit {
  form!: FormGroup;
  courseId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.extractCourseIdFromRoute();
    this.loadCourseData();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, Validators.required],
      image: [null, Validators.required],
    });
  }

  extractCourseIdFromRoute(): void {
    this.route.params.subscribe((params) => {
      this.courseId = +params['id'];
    });
  }

  loadCourseData(): void {
    this.courseService.findCourseById(this.courseId).subscribe({
      next: (course: Course) => this.populateForm(course),
      error: (error: HttpErrorResponse) => this.handleError(error, 'fetching course data'),
    });
  }

  populateForm(course: Course): void {
    this.form.patchValue({
      name: course.name,
      description: course.description,
      image: course.image,
    });
  }

  saveCourse(): void {
    if (this.form.invalid) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    const courseData = this.getFormData();
    this.courseService.updateCourse(courseData).subscribe({
      next: () => this.handleSuccess(),
      error: (error: HttpErrorResponse) => this.handleError(error, 'updating the course'),
    });
  }

  getFormData(): Course {
    return {
      id: this.courseId,
      name: this.form.value.name,
      description: this.form.value.description,
      image: this.form.value.image,
    };
  }

  handleSuccess(): void {
    alert('Curso salvo com sucesso!');
    this.navigateBack();
  }

  handleError(error: HttpErrorResponse, context: string): void {
    console.error(`Error ${context}`, error);
  }

  navigateBack(): void {
    this.router.navigate(['admin/courses']);
  }
}
