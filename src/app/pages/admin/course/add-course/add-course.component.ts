import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarMenuAdminComponent } from '../../../../components/sidebar-menu-admin/sidebar-menu-admin.component';
import { CourseService } from '../../../../services/course.service';
import { InputComponent } from '../../../../shared/input/input.component';

@Component({
  selector: 'app-add-course',
  standalone: true,
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.scss',
  imports: [InputComponent, SidebarMenuAdminComponent],
})
export class AddCourseComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: CourseService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, Validators.required],
      image: [null, Validators.required],
    });
  }

  goBack(): void {
    this.router.navigate(['/courses']);
  }

  saveCourse(): void {
    if (this.form.invalid) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    const data = this.getCourseData();
    this.service.createCourse(data).subscribe({
      next: (response: any) => {
        alert('Curso Criado com sucesso!');
        this.goBack();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error posting Course', error);
      },
    });
  }

  getCourseData() {
    return {
      id: null,
      name: this.form.value.name,
      description: this.form.value.description,
      image: this.form.value.image,
    };
  }
}
