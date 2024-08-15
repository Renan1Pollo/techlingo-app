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

@Component({
  selector: 'app-edit-lesson',
  standalone: true,
  templateUrl: './edit-lesson.component.html',
  styleUrl: './edit-lesson.component.scss',
  imports: [SidebarMenuAdminComponent, InputComponent, SelectionInputComponent],
})
export class EditLessonComponent implements OnInit {
  form!: FormGroup;
  units!: Unit[];
  unitsTitle!: string[];
  lessonId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private service: LessonService,
    private unitService: UnitService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      unit: [null, [Validators.required]],
      title: [null, Validators.required],
      description: [null, Validators.required],
      points: [null, Validators.required],
      index: [null, Validators.required],
    });

    this.route.params.subscribe((params) => {
      this.lessonId = +params['id'];
    });

    this.getUnitData();
  }

  goBack(): void {
    this.router.navigate(['admin/lessons']);
  }

  saveLesson(): void {
    if (this.form.invalid) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    const unitTitle = this.form.value.unit;
    this.unitService.findUnitByTitle(unitTitle).subscribe({
      next: (unit: Unit) => {
        if (!unit) {
          alert('Unidade não encontrado!');
          return;
        }

        const data = {
          id: this.lessonId,
          unit: unit,
          title: this.form.value.title,
          description: this.form.value.description,
          points: this.form.value.points,
          index: this.form.value.index,
        };

        this.service.updateLesson(data).subscribe({
          next: (response: any) => {
            alert('Licao Alterada com sucesso!');
            this.goBack();
          },
          error: (error: HttpErrorResponse) => {
            console.error('Error posting Lesson', error);
          },
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error finding unit', error);
      },
    });
  }

  getUnitData(): void {
    this.unitService.getAllUnitDetails().subscribe({
      next: (data: Unit[]) => {
        this.units = data;
        this.unitsTitle = this.units.map((unit) => unit.title);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching units', error);
      },
    });
  }
}
