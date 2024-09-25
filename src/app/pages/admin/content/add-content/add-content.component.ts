import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarMenuAdminComponent } from "../../../../components/sidebar-menu-admin/sidebar-menu-admin.component";
import { ContentService } from '../../../../services/content.service';
import { LessonService } from '../../../../services/lesson.service';
import { InputComponent } from "../../../../shared/input/input.component";
import { SelectionInputComponent } from "../../../../shared/selection-input/selection-input.component";
import { Lesson } from '../../../../types/Lesson.type';

@Component({
  selector: 'app-add-content',
  standalone: true,
  imports: [InputComponent, SidebarMenuAdminComponent, SelectionInputComponent],
  templateUrl: './add-content.component.html',
  styleUrl: './add-content.component.scss'
})
export class AddContentComponent implements OnInit {
  lessons!: Lesson[];
  lessonsTitle!: string[];
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private lessonService: LessonService,
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      lesson: [null, [Validators.required]],
      title: [null, Validators.required],
      text: [null, Validators.required],
      image: [null],
      index: [null, Validators.required],
    });

    this.getLessonData();
  }

  goBack(): void {
    this.router.navigate(['admin/contents']);
  }

  saveContent(): void {
    if (this.form.invalid) {

      alert('Preencha todos os campos corretamente!');
      return;
    }

    const lessonName = this.form.value.lesson;
    const selectedLesson = this.lessons.find(lesson => lesson.title === lessonName);
    const data = this.getContentData(selectedLesson!);
    this.contentService.createContent(data).subscribe({
      next: (response: any) => {
        alert('Conteudo criado com sucesso!');
        this.goBack();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error posting Content', error);
      },
    });
  }

  getContentData(selectedLesson: Lesson) {
    const lesson = selectedLesson;

    return {
      id: null,
      lesson: lesson,
      title: this.form.value.title,
      text: this.form.value.text,
      image: this.form.value.image,
      index: this.form.value.index,
    };
  };


  getLessonData(): void {
    this.lessonService.getAllLessonDetails().subscribe({
      next: (data: Lesson[]) => {
        this.lessons = data;
        this.lessonsTitle = this.lessons.map(lesson => lesson.title);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching lessons', error);
      }
    });
  }

}
