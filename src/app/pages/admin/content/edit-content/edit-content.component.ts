import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lesson } from '../../../../types/Lesson.type';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from '../../../../services/lesson.service';
import { ContentService } from '../../../../services/content.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SidebarMenuAdminComponent } from "../../../../components/sidebar-menu-admin/sidebar-menu-admin.component";
import { InputComponent } from "../../../../shared/input/input.component";
import { SelectionInputComponent } from "../../../../shared/selection-input/selection-input.component";
import { Content, ContentResponseDTO } from '../../../../types/Content.type';

@Component({
  selector: 'app-edit-content',
  standalone: true,
  imports: [SidebarMenuAdminComponent, InputComponent, SelectionInputComponent],
  templateUrl: './edit-content.component.html',
  styleUrl: './edit-content.component.scss'
})
export class EditContentComponent implements OnInit {
  form!: FormGroup;
  lessons!: Lesson[];
  lessonsTitle!: string[];
  contentId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private lessonService: LessonService,
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.extractContentId();
    this.loadLessons();
    this.loadContentData();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      lesson: [null, [Validators.required]],
      title: [null, Validators.required],
      text: [null, Validators.required],
      image: [null, Validators.required],
      index: [null, Validators.required],
    });
  }

  private extractContentId(): void {
    this.route.params.subscribe((params) => {
      this.contentId = +params['id'];
    });
  }

  private loadLessons(): void {
    this.lessonService.getAllLessonDetails().subscribe({
      next: (lessons: Lesson[]) => {
        this.lessons = lessons;
        this.lessonsTitle = lessons.map((lesson) => lesson.title);
      },
      error: (error: HttpErrorResponse) => this.handleError(error, 'loading lessons'),
    });
  }

  private loadContentData(): void {
    this.contentService.findContentById(this.contentId).subscribe({
      next: (content: Content) => this.populateForm(content),
      error: (error: HttpErrorResponse) => this.handleError(error, 'loading content data'),
    });
  }

  private populateForm(content: Content): void {
    this.form.patchValue({
      lesson: content.lesson.title,
      title: content.title,
      text: content.text,
      image: content.image,
      index: content.index,
    });

  }

  saveContent(): void {
    if (this.form.invalid) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    const lessonName = this.form.value.lesson;
    const selectedLesson = this.lessons.find(lesson => lesson.title === lessonName);
    this.updateContent(selectedLesson!);
  }

  private updateContent(selectedLesson: Lesson): void {
    if (!selectedLesson) {
      alert('Licao não encontrada!');
      return;
    }

    const contentData = this.createContentData(selectedLesson);
    this.contentService.updateContent(contentData).subscribe({
      next: () => this.handleSuccess(),
      error: (error: HttpErrorResponse) => this.handleError(error, 'updating content'),
    });
  }

  createContentData(selectedLesson: Lesson): Content {
    return {
      id: this.contentId,
      lesson: selectedLesson,
      title: this.form.value.title,
      text: this.form.value.text,
      image: this.form.value.image,
      index: this.form.value.index,
    };
  };

  private handleSuccess(): void {
    alert('Conteudo atualizada com sucesso!');
    this.navigateBack();
  }

  private handleError(error: HttpErrorResponse, context: string): void {
    console.error(`Error ${context}`, error);
  }

  navigateBack(): void {
    this.router.navigate(['admin/contents']);
  }

}
