import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AnswersCardComponent } from '../../components/answers-card/answers-card.component';
import { LearnModalComponent } from '../../components/learn-modal/learn-modal.component';
import { AnswerResponseDTO } from '../../types/Answer.type';
import { LessonResponseDTO } from '../../types/Lesson.type';
import { QuestionResponseDTO } from '../../types/Question.type';
import { User } from '../../types/User.type';

@Component({
  selector: 'app-lesson-quiz',
  standalone: true,
  imports: [LearnModalComponent, CommonModule, AnswersCardComponent],
  templateUrl: './lesson-quiz.component.html',
  styleUrls: ['./lesson-quiz.component.scss'],
})
export class LessonQuizComponent implements OnInit {
  @Input() questions: QuestionResponseDTO[] = [];
  @Input() selectedLesson!: LessonResponseDTO;
  @Output() lessonCompleted = new EventEmitter<number>();

  selectedAnswer: AnswerResponseDTO | null = null;
  feedbackMessage: string | null = null;
  buttonLabel: string = 'Verificar';
  isModalOpen: boolean = true;
  currentQuestionIndex: number = 0;
  isQuizCompleted: boolean = false;
  incorrectAnswers: QuestionResponseDTO[] = [];
  lives: number = 5;

  @ViewChild(LearnModalComponent) modalComponent!: LearnModalComponent;

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user: User = JSON.parse(userData);
      this.lives = user.lives;
    }
  }

  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }

  selectAnswer(answer: AnswerResponseDTO): void {
    this.selectedAnswer = answer;
    this.clearFeedback();
  }

  verifyAnswer(): void {
    if (!this.selectedAnswer || this.feedbackMessage) {
      this.resetForNextQuestion();
      return;
    }

    this.displayFeedback();
    if (!this.selectedAnswer.correct) {
      this.processWrongAnswer();
    }

    this.buttonLabel = 'Continuar';
  }

  private displayFeedback(): void {
    this.feedbackMessage = this.selectedAnswer?.correct
      ? `Resposta correta! ${this.selectedAnswer.feedbackText}`
      : `Resposta incorreta. ${this.selectedAnswer!.feedbackText}`;
  }

  private resetForNextQuestion(): void {
    this.buttonLabel = 'Verificar';
    this.moveToNextQuestion();
  }

  private moveToNextQuestion(): void {
    if (!this.selectedAnswer) return;

    if (this.hasMoreQuestions()) {
      this.loadNextQuestion();
    } else {
      this.completeQuiz();
    }
  }

  private hasMoreQuestions(): boolean {
    return this.currentQuestionIndex < this.questions.length - 1;
  }

  private loadNextQuestion(): void {
    this.currentQuestionIndex++;
    this.clearSelection();
  }

  moveToPreviousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.clearSelection();
    }
  }

  private clearSelection(): void {
    this.selectedAnswer = null;
    this.clearFeedback();
  }

  private clearFeedback(): void {
    this.feedbackMessage = null;
  }

  private completeQuiz(): void {
    this.isQuizCompleted = true;

    if (this.incorrectAnswers.length > 0) {
      alert('Vamos rever o que você errou!');
      this.retryIncorrectAnswers();
    } else {
      this.finishLesson();
    }
  }

  private finishLesson(): void {
    this.lessonCompleted.emit(this.lives)
    this.toggleModal();
  }

  private processWrongAnswer(): void {
    this.decreaseLives();
    this.storeWrongAnswer();
  }

  decreaseLives(): void {
    this.lives--;
    this.updateLivesInModal();

    if (this.lives === 0) {
      alert('Você perdeu todas as suas vidas!');
      this.finishLesson();
    }
  }

  private storeWrongAnswer(): void {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    if (!this.incorrectAnswers.includes(currentQuestion)) {
      this.incorrectAnswers.push(currentQuestion);
    }
  }

  private updateLivesInModal(): void {
    this.modalComponent.decreaseLives(this.lives);
  }

  private retryIncorrectAnswers(): void {
    this.questions = [...this.incorrectAnswers];
    this.incorrectAnswers = [];
    this.currentQuestionIndex = 0;
    this.isQuizCompleted = false;
    this.clearSelection();
  }
}
