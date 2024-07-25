import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarMenuAdminComponent } from '../../../../components/sidebar-menu-admin/sidebar-menu-admin.component';
import { CourseService } from '../../../../services/course.service';
import { InputComponent } from '../../../../shared/input/input.component';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.scss',
  imports: [InputComponent, SidebarMenuAdminComponent, CommonModule],
})
export class EditCourseComponent implements OnInit {
  form!: FormGroup;
  cursoId!: number;

  constructor(
    private route: ActivatedRoute,
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

    this.route.params.subscribe((params) => {
      this.cursoId = +params['id'];
      console.log(this.cursoId);
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
    this.service.updateCourse(data).subscribe({
      next: (response: any) => {
        alert('Curso Salvo com sucesso!');
        this.goBack();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error updating Course', error);
      },
    });
  }

  getCourseData() {
    return {
      id: this.cursoId,
      name: this.form.value.name,
      description: this.form.value.description,
      image: this.form.value.image,
    };
  }
}
