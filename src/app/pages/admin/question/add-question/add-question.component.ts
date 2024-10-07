import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarMenuAdminComponent } from '../../../../components/sidebar-menu-admin/sidebar-menu-admin.component';
import { AnswerService } from '../../../../services/answer.service';
import { LessonService } from '../../../../services/lesson.service';
import { QuestionService } from '../../../../services/question.service';
import { CheckboxComponent } from '../../../../shared/checkbox/checkbox.component';
import { InputComponent } from '../../../../shared/input/input.component';
import { SelectionInputComponent } from '../../../../shared/selection-input/selection-input.component';
import { Answer } from '../../../../types/Answer.type';
import { Lesson } from '../../../../types/Lesson.type';
import { Question } from './../../../../types/Question.type';

@Component({
  selector: 'app-add-question',
  standalone: true,
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
  imports: [
    SelectionInputComponent,
    InputComponent,
    SidebarMenuAdminComponent,
    CommonModule,
    CheckboxComponent,
  ],
})
export class AddQuestionComponent implements OnInit {
  lessons!: Lesson[];
  lessonsTitles!: string[];
  isAnswerModalOpen = false;
  form!: FormGroup;
  answerForm!: FormGroup;
  answersToSave: Answer[] = [];
  isEditingAnswer = false;
  editingAnswerIndex: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private lessonService: LessonService,
    private questionService: QuestionService,
    private answerService: AnswerService
  ) {}

  ngOnInit(): void {
    this.initializeForms();
    this.loadLessons();
  }

  goBack(): void {
    this.router.navigate(['admin/questions']);
  }

  saveQuestion(): void {
    if (this.form.invalid) {
      this.showAlert('Preencha todos os campos corretamente!');
      return;
    }

    const selectedLesson = this.getSelectedLesson();
    const questionData = this.constructQuestionData(selectedLesson!);

    this.questionService.createQuestion(questionData).subscribe({
      next: (response: Question) => {
        this.createAnswers(response);
        this.showAlert('Questão criada com sucesso!');
        this.goBack();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error posting Question', error);
      },
    });
  }

  openAnswerModal(answer?: Answer, index?: number): void {
    this.isEditingAnswer = !!answer;
    this.editingAnswerIndex = index ?? null;

    if (this.isEditingAnswer) {
      this.populateAnswerForm(answer!);
    } else {
      this.answerForm.reset();
    }

    this.isAnswerModalOpen = true;
  }

  closeAnswerModal(): void {
    this.isAnswerModalOpen = false;
  }

  saveAnswer(): void {
    if (!this.answerForm.valid) return;

    const newAnswer: Answer = this.createAnswerObject();

    if (this.isEditingAnswer && this.editingAnswerIndex !== null) {
      this.answersToSave[this.editingAnswerIndex] = newAnswer;
    } else {
      this.answersToSave.push(newAnswer);
    }

    this.closeAnswerModal();
  }

  removeAnswer(index: number): void {
    this.answersToSave.splice(index, 1);
  }

  private initializeForms(): void {
    this.form = this.fb.group({
      lesson: [null, [Validators.required]],
      description: [null, Validators.required],
      index: [null, Validators.required],
    });

    this.answerForm = this.fb.group({
      text: [null, Validators.required],
      feedbackText: [null, Validators.required],
      correct: [false],
    });
  }

  private loadLessons(): void {
    this.lessonService.getAllLessonDetails().subscribe({
      next: (data: Lesson[]) => {
        this.lessons = data;
        this.lessonsTitles = this.lessons.map((lesson) => lesson.title);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching lessons', error);
      },
    });
  }

  private getSelectedLesson(): Lesson | undefined {
    const lessonName = this.form.value.lesson;
    return this.lessons.find((lesson) => lesson.title === lessonName);
  }

  private constructQuestionData(selectedLesson: Lesson) {
    return {
      id: null,
      lesson: selectedLesson,
      description: this.form.value.description,
      index: this.form.value.index,
    };
  }

  private createAnswers(question: Question): void {
    this.answersToSave.forEach((answer) => {
      answer.question = question;
      this.answerService.createAnswer(answer).subscribe({
        next: () => console.log('Resposta salva com sucesso!'),
        error: (error: HttpErrorResponse) => {
          console.error('Error saving answer', error);
        },
      });
    });
  }

  private populateAnswerForm(answer: Answer): void {
    this.answerForm.patchValue({
      text: answer.text,
      feedbackText: answer.feedbackText,
      correct: answer.correct,
    });
  }

  private createAnswerObject(): Answer {
    return {
      id: null,
      text: this.answerForm.value.text,
      feedbackText: this.answerForm.value.feedbackText,
      correct: this.answerForm.value.correct,
      question: null,
    };
  }

  private showAlert(message: string): void {
    alert(message);
  }
}
