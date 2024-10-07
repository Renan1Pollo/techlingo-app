import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SidebarMenuAdminComponent } from '../../../../components/sidebar-menu-admin/sidebar-menu-admin.component';
import { InputComponent } from '../../../../shared/input/input.component';
import { SelectionInputComponent } from '../../../../shared/selection-input/selection-input.component';
import { LessonService } from '../../../../services/lesson.service';
import { QuestionService } from '../../../../services/question.service';
import { AnswerService } from '../../../../services/answer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Lesson } from '../../../../types/Lesson.type';
import { Question } from './../../../../types/Question.type';
import { Answer } from './../../../../types/Answer.type';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from "../../../../shared/checkbox/checkbox.component";

@Component({
  selector: 'app-edit-question',
  standalone: true,
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss'],
  imports: [SidebarMenuAdminComponent, InputComponent, SelectionInputComponent, CommonModule, CheckboxComponent],
})
export class EditQuestionComponent implements OnInit {
  form!: FormGroup;
  answerForm!: FormGroup;
  lessons!: Lesson[];
  lessonsTitle!: string[];
  questionId!: number;
  answers: Answer[] = [];
  isAnswerModalOpen = false;
  editingAnswer: boolean = false;
  currentAnswerIndex!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private lessonService: LessonService,
    private questionService: QuestionService,
    private answerService: AnswerService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadLessons();
    this.extractQuestionIdFromRoute();
    this.loadQuestionData();
  }

  initializeForm(): void {
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

  loadLessons(): void {
    this.lessonService.getAllLessonDetails().subscribe({
      next: (lessons: Lesson[]) => {
        this.lessons = lessons;
        this.lessonsTitle = lessons.map((lesson) => lesson.title);
      },
      error: (error: HttpErrorResponse) =>
        this.handleError(error, 'loading lessons'),
    });
  }

  extractQuestionIdFromRoute(): void {
    this.route.params.subscribe((params) => {
      this.questionId = +params['id'];
    });
  }

  loadQuestionData(): void {
    this.questionService.findQuestionById(this.questionId).subscribe({
      next: (question: Question) => this.populateForm(question),
      error: (error: HttpErrorResponse) =>
        this.handleError(error, 'fetching question data'),
    });

    this.answerService.findAnswerByQuestionId(this.questionId).subscribe({
      next: (answers: Answer[]) => {
          console.log('Answers:', answers);
          this.answers = answers;
      },
      error: (error: HttpErrorResponse) => this.handleError(error, 'fetching answer data'),
  });
  }

  populateForm(question: Question): void {
    this.form.patchValue({
      lesson: question.lesson.title,
      description: question.description,
      index: question.index,
    });
  }

  openAnswerModal(answer?: Answer, index?: number): void {
    this.isAnswerModalOpen = true;
    this.editingAnswer = !!answer;

    if (answer) {
      this.currentAnswerIndex = index!;
      this.answerForm.patchValue({
        text: answer.text,
        feedbackText: answer.feedbackText,
        correct: answer.correct,
      });
    } else {
      this.answerForm.reset();
    }
  }

  closeAnswerModal(): void {
    this.isAnswerModalOpen = false;
    this.answerForm.reset();
  }

  saveAnswer(): void {
    if (this.answerForm.valid) {
      const answerData = this.answerForm.value;

      if (this.editingAnswer) {
        this.answers[this.currentAnswerIndex] = answerData;
      } else {
        this.answers.push(answerData);
      }

      this.closeAnswerModal();
    }
  }

  removeAnswer(index: number): void {
    this.answers.splice(index, 1);
  }

  saveQuestion(): void {
    if (this.form.invalid) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    const lessonName = this.form.value.lesson;
    const selectedLesson = this.lessons.find(lesson => lesson.title === lessonName);
    const questionData: Question = {
      id: this.questionId,
      lesson: selectedLesson!,
      description: this.form.value.description,
      index: this.form.value.index,
    };

    this.questionService.updateQuestion(this.questionId, questionData).subscribe({
      next: (response: Question) => {
        this.updateAnswers(response);
        this.showAlert('Questão atualizada com sucesso!');
        this.navigateBack();
      },
      error: (error: HttpErrorResponse) => this.handleError(error, 'saving question data')
    });
  }

  private updateAnswers(question: Question): void {
    const updatedAnswers: Answer[] = [...this.answers];

    updatedAnswers.forEach((answer, index) => {
        this.answerService.createAnswer({ ...answer, question: question }).subscribe({
          next: () => console.log(`Resposta ${index + 1} criada com sucesso!`),
          error: (error: HttpErrorResponse) => this.handleError(error, `creating answer ${index + 1}`)
        });

    });
  }

  private handleError(error: HttpErrorResponse, context: string): void {
    console.error(`Error ${context}`, error);
  }

  navigateBack(): void {
    this.router.navigate(['admin/questions']);
  }

  private showAlert(message: string): void {
    alert(message);
  }
}
