import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarMenuAdminComponent } from '../../../../components/sidebar-menu-admin/sidebar-menu-admin.component';
import { AnswerService } from '../../../../services/answer.service';
import { LessonService } from '../../../../services/lesson.service';
import { QuestionService } from '../../../../services/question.service';
import { InputComponent } from '../../../../shared/input/input.component';
import { SelectionInputComponent } from '../../../../shared/selection-input/selection-input.component';
import { Lesson } from '../../../../types/Lesson.type';
import { Answer } from '../../../../types/Answer.type';

@Component({
  selector: 'app-add-question',
  standalone: true,
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.scss',
  imports: [
    InputComponent,
    SidebarMenuAdminComponent,
    SelectionInputComponent,
    CommonModule,
  ],
})
export class AddQuestionComponent implements OnInit {
  lessons!: Lesson[];
  lessonsTitle!: string[];
  isAnswerModalOpen = false;
  form!: FormGroup;
  answerForm!: FormGroup;
  answersToSave!: Answer[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private lessonService: LessonService,
    private questionService: QuestionService,
    private answerService: AnswerService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      lesson: [null, [Validators.required]],
      description: [null, Validators.required],
      indice: [null, Validators.required],
    });

    this.answerForm = this.fb.group({
      text: [null, Validators.required],
      feedbackText: [null, Validators.required],
      isCorrect: null,
    });

    this.getLessonData();
  }

  goBack(): void {
    this.router.navigate(['admin/questions']);
  }

  saveQuestion(): void {
    if (this.form.invalid) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    const lessonName = this.form.value.lesson;
    const selectedLesson = this.lessons.find(
      (lesson) => lesson.title === lessonName
    );
    const data = this.getQuestionData(selectedLesson!);
    this.questionService.createQuestion(data).subscribe({
      next: (response: any) => {
        alert('Questão criada com sucesso!');
        this.goBack();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error posting Question', error);
      },
    });
  }

  openAnswerModal(): void {
    this.isAnswerModalOpen = true;
  }

  closeAnswerModal(): void {
    this.isAnswerModalOpen = false;
  }

  addAnswer(): void {
    if (this.answerForm.valid) {
      const answer = this.getAnswerData();
      this.answersToSave.push(answer)
      console.log('Answer added:', answer);
      this.closeAnswerModal();
    }
  }

  private getQuestionData(selectedLesson: Lesson) {
    const lesson = selectedLesson;

    return {
      id: null,
      lesson: lesson,
      description: this.form.value.description,
      index: this.form.value.index,
    };
  }

  private getAnswerData(): Answer {
    return {
      id: null,
      text: this.answerForm.value.text,
      question: null,
      feedbackText: this.answerForm.value.feedbackText,
      correct: true,
    };
  }

  private getLessonData(): void {
    this.lessonService.getAllLessonDetails().subscribe({
      next: (data: Lesson[]) => {
        this.lessons = data;
        this.lessonsTitle = this.lessons.map((lesson) => lesson.title);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching lessons', error);
      },
    });
  }
}
