import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarMenuAdminComponent } from '../../../../components/sidebar-menu-admin/sidebar-menu-admin.component';
import { CourseService } from '../../../../services/course.service';
import { UnitService } from '../../../../services/unit.service';
import { InputComponent } from '../../../../shared/input/input.component';
import { SelectionInputComponent } from '../../../../shared/selection-input/selection-input.component';
import { Course } from '../../../../types/Course.type';
import { Unit } from '../../../../types/Unit.type';

@Component({
  selector: 'app-edit-unit',
  standalone: true,
  templateUrl: './edit-unit.component.html',
  styleUrls: ['./edit-unit.component.scss'],
  imports: [SidebarMenuAdminComponent, InputComponent, SelectionInputComponent],
})
export class EditUnitComponent implements OnInit {
  coursesName!: string[]; // Lista de strings
  form!: FormGroup;
  unitId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private courseService: CourseService,
    private unitService: UnitService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.extractUnitIdFromRoute();
    this.loadCourses();
    this.loadUnitData();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      course: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      points: [null, Validators.required],
      index: [null, Validators.required],
    });
  }

  extractUnitIdFromRoute(): void {
    this.route.params.subscribe((params) => {
      this.unitId = +params['id'];
    });
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (courses: Course[]) => {
        this.coursesName = courses.map(course => course.name); // Extrai apenas os nomes dos cursos
      },
      error: (error: HttpErrorResponse) => this.handleError(error, 'fetching courses'),
    });
  }

  loadUnitData(): void {
    this.unitService.findUnitById(this.unitId).subscribe({
      next: (unit: Unit) => this.populateForm(unit),
      error: (error: HttpErrorResponse) => this.handleError(error, 'fetching unit data'),
    });
  }

  populateForm(unit: Unit): void {
    this.form.patchValue({
      course: unit.course.name,
      title: unit.title,
      description: unit.description,
      points: unit.points,
      index: unit.index,
    });
  }

  saveUnit(): void {
    if (this.form.invalid) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    this.courseService.findCourseByName(this.form.value.course).subscribe({
      next: (course: Course) => this.updateUnit(course),
      error: (error: HttpErrorResponse) => this.handleError(error, 'finding course'),
    });
  }

  updateUnit(course: Course): void {
    if (!course) {
      alert('Curso não encontrado!');
      return;
    }

    const unitData = this.getFormData(course);
    this.unitService.updateUnit(unitData).subscribe({
      next: () => this.handleSuccess(),
      error: (error: HttpErrorResponse) => this.handleError(error, 'updating unit'),
    });
  }

  getFormData(course: Course): Unit {
    return {
      id: this.unitId,
      course: course,
      title: this.form.value.title,
      description: this.form.value.description,
      points: this.form.value.points,
      index: this.form.value.index,
    };
  }

  handleSuccess(): void {
    alert('Unidade atualizada com sucesso!');
    this.navigateBack();
  }

  handleError(error: HttpErrorResponse, context: string): void {
    console.error(`Error ${context}`, error);
  }

  navigateBack(): void {
    this.router.navigate(['admin/units']);
  }
}
