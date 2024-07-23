import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputComponent } from '../../../../shared/input/input.component';
import { Course } from '../../../../types/Course.type';
import { SidebarMenuAdminComponent } from '../../sidebar-menu-admin/sidebar-menu-admin.component';
import { CourseService } from './../../../../services/course.service';
import { UnitService } from './../../../../services/unit.service';
import { SelectionInputComponent } from "../../../../shared/selection-input/selection-input.component";

@Component({
  selector: 'app-add-unit',
  standalone: true,
  templateUrl: './add-unit.component.html',
  styleUrl: './add-unit.component.scss',
  imports: [InputComponent, SidebarMenuAdminComponent, SelectionInputComponent],
})
export class AddUnitComponent implements OnInit {
  courses!: Course[];
  coursesName!: string[];
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private courseService: CourseService,
    private service: UnitService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      course: [null, [Validators.required]],
      title: [null, Validators.required],
      description: [null, Validators.required],
      points: [null, Validators.required],
      index: [null, Validators.required],
    });

    this.getCourseData();
  }

  goBack(): void {
    this.router.navigate(['/units']);
  }

  saveUnit(): void {
    if (this.form.invalid) {
      console.log(this.form)
      alert('Preencha todos os campos corretamente!');
      return;
    }

    const courseName = this.form.value.course;
    this.courseService.findCourseByName(courseName).subscribe({
      next: (course: Course) => {
        if (!course) {
          alert('Curso não encontrado!');
          return;
        }

        const data = {
          id: null,
          course: course,
          title: this.form.value.title,
          description: this.form.value.description,
          points: this.form.value.points,
          index: this.form.value.index,
        };

        console.log(data)
        this.service.createUnit(data).subscribe({
          next: (response: any) => {
            alert('Unidade Criada com sucesso!');
            this.goBack();
          },
          error: (error: HttpErrorResponse) => {
            console.error('Error posting Unit', error);
          },
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error finding course', error);
      },
    });
  }

  getUnitData() {
    const course = this.courseService.findCourseByName(this.form.value.course);

    return {
      id: null,
      course: course,
      title: this.form.value.title,
      description: this.form.value.description,
      points: this.form.value.points,
      index: this.form.value.index,
    };
  }

  getCourseData(): void {
    this.courseService.getAllCourses().subscribe({
      next: (data: Course[]) => {
        this.courses = data;
        this.coursesName = this.courses.map(course => course.name);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching courses', error);
      }
    });
  }
}
