import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarMenuAdminComponent } from '../../../../components/sidebar-menu-admin/sidebar-menu-admin.component';
import { CourseService } from '../../../../services/course.service';
import { UnitService } from '../../../../services/unit.service';
import { InputComponent } from '../../../../shared/input/input.component';
import { SelectionInputComponent } from "../../../../shared/selection-input/selection-input.component";
import { Course } from '../../../../types/Course.type';

@Component({
  selector: 'app-edit-unit',
  standalone: true,
  templateUrl: './edit-unit.component.html',
  styleUrl: './edit-unit.component.scss',
  imports: [SidebarMenuAdminComponent, InputComponent, SelectionInputComponent],
})
export class EditUnitComponent implements OnInit {
  courses!: Course[];
  coursesName!: string[];
  form!: FormGroup;
  unitId!: number;

  constructor(
    private route: ActivatedRoute,
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

    this.route.params.subscribe((params) => {
      this.unitId = +params['id'];
      console.log(this.unitId);
    });

    this.getCourseData();
  }

  goBack(): void {
    this.router.navigate(['admin/units']);
  }

  saveUnit(): void {
    if (this.form.invalid) {
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
          id: this.unitId,
          course: course,
          title: this.form.value.title,
          description: this.form.value.description,
          points: this.form.value.points,
          index: this.form.value.index,
        };

        this.service.updateUnit(data).subscribe({
          next: (response: any) => {
            alert('Unidade Atualizada com sucesso!');
            this.goBack();
          },
          error: (error: HttpErrorResponse) => {
            console.error('Error updating Unit', error);
          },
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error finding course', error);
      },
    });
  }

  getCourseData(): void {
    this.courseService.getAllCoursesDetails().subscribe({
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
