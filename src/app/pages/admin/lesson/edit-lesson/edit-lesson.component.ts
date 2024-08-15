import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarMenuAdminComponent } from '../../../../components/sidebar-menu-admin/sidebar-menu-admin.component';
import { LessonService } from '../../../../services/lesson.service';
import { UnitService } from '../../../../services/unit.service';
import { InputComponent } from '../../../../shared/input/input.component';
import { SelectionInputComponent } from '../../../../shared/selection-input/selection-input.component';
import { Unit } from '../../../../types/Unit.type';
import { Lesson } from '../../../../types/Lesson.type';

@Component({
  selector: 'app-edit-lesson',
  standalone: true,
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.scss'],
  imports: [SidebarMenuAdminComponent, InputComponent, SelectionInputComponent],
})
export class EditLessonComponent implements OnInit {
  form!: FormGroup;
  units!: Unit[];
  unitTitles!: string[];
  lessonId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private lessonService: LessonService,
    private unitService: UnitService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.extractLessonId();
    this.loadUnits();
    this.loadLessonData();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      unit: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      points: [null, Validators.required],
      index: [null, Validators.required],
    });
  }

  private extractLessonId(): void {
    this.route.params.subscribe((params) => {
      this.lessonId = +params['id'];
    });
  }

  private loadUnits(): void {
    this.unitService.getAllUnitDetails().subscribe({
      next: (units: Unit[]) => {
        this.units = units;
        this.unitTitles = units.map((unit) => unit.title);
      },
      error: (error: HttpErrorResponse) => this.handleError(error, 'loading units'),
    });
  }

  private loadLessonData(): void {
    this.lessonService.findLessonById(this.lessonId).subscribe({
      next: (lesson: Lesson) => this.populateForm(lesson),
      error: (error: HttpErrorResponse) => this.handleError(error, 'loading lesson data'),
    });
  }

  private populateForm(lesson: Lesson): void {
    this.form.patchValue({
      unit: lesson.unit.title,
      title: lesson.title,
      description: lesson.description,
      points: lesson.points,
      index: lesson.index,
    });
  }

  saveLesson(): void {
    if (this.form.invalid) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    const unitTitle = this.form.value.unit;
    this.unitService.findUnitByTitle(unitTitle).subscribe({
      next: (unit: Unit) => this.updateLesson(unit),
      error: (error: HttpErrorResponse) => this.handleError(error, 'finding unit'),
    });
  }

  private updateLesson(unit: Unit): void {
    if (!unit) {
      alert('Unidade não encontrada!');
      return;
    }

    const lessonData = this.createLessonData(unit);
    this.lessonService.updateLesson(lessonData).subscribe({
      next: () => this.handleSuccess(),
      error: (error: HttpErrorResponse) => this.handleError(error, 'updating lesson'),
    });
  }

  private createLessonData(unit: Unit): Lesson {
    return {
      id: this.lessonId,
      unit: unit,
      title: this.form.value.title,
      description: this.form.value.description,
      points: this.form.value.points,
      index: this.form.value.index,
    };
  }

  private handleSuccess(): void {
    alert('Lição atualizada com sucesso!');
    this.navigateBack();
  }

  private handleError(error: HttpErrorResponse, context: string): void {
    console.error(`Error ${context}`, error);
  }

  navigateBack(): void {
    this.router.navigate(['admin/lessons']);
  }
}
