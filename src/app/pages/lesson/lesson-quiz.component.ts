import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AnswersCardComponent } from '../../components/answers-card/answers-card.component';
import { LearnModalComponent } from '../../components/learn-modal/learn-modal.component';
import { AnswerResponseDTO } from '../../types/Answer.type';
import { ContentResponseDTO } from '../../types/Content.type';
import { LessonResponseDTO } from '../../types/Lesson.type';
import { QuestionResponseDTO } from '../../types/Question.type';
import { User } from '../../types/User.type';
import { UserService } from './../../services/user.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-lesson-quiz',
  standalone: true,
  imports: [LearnModalComponent, CommonModule, AnswersCardComponent],
  templateUrl: './lesson-quiz.component.html',
  styleUrls: ['./lesson-quiz.component.scss'],
})
export class LessonQuizComponent implements OnInit {
  @Input() questions: QuestionResponseDTO[] = [];
  @Input() contents: ContentResponseDTO[] = [];
  @Input() selectedLesson!: LessonResponseDTO;
  @Output() lessonCompleted = new EventEmitter<number>();

  selectedAnswer: AnswerResponseDTO | null = null;
  feedbackMessage: string | null = null;
  buttonLabel: string = 'Verificar';
  isModalOpen: boolean = true;
  currentQuestionIndex: number = 0;
  currentContentIndex: number = 0;
  isContentDisplayed: boolean = true;
  isQuizCompleted: boolean = false;
  incorrectAnswers: QuestionResponseDTO[] = [];
  incorrectContents: ContentResponseDTO[] = [];
  lives: number = 5;
  userId!: number;

  @ViewChild(LearnModalComponent) modalComponent!: LearnModalComponent;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.initializeUserData();
  }

  selectAnswer(answer: AnswerResponseDTO): void {
    this.selectedAnswer = answer;
    this.clearFeedback();
  }

  verifyAnswer(): void {
    if (this.isContentDisplayed) {
      this.isContentDisplayed = false;
      this.currentContentIndex++;
      return;
    }

    if (!this.selectedAnswer) {
      return;
    }

    if (!this.selectedAnswer || this.feedbackMessage) {
      this.prepareNextQuestion();
      return;
    }

    this.displayFeedback();
    if (!this.selectedAnswer.correct) {
      this.processWrongAnswer();
    }

    this.buttonLabel = 'Continuar';
  }

  moveToPreviousItem(): void {
    if (this.currentContentIndex === 0) {
      return;
    }

    this.currentContentIndex--;
    this.isContentDisplayed = !this.isContentDisplayed;
    this.clearSelection();
  }

  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
    this.updateLivesInBD();
  }

  private initializeUserData(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user: User = JSON.parse(userData);
      this.lives = user.lives;
      this.userId = user.id;
    }
  }

  private displayFeedback(): void {
    this.feedbackMessage = this.selectedAnswer?.correct
      ? `Resposta correta! ${this.selectedAnswer.feedbackText}`
      : `Resposta incorreta. ${this.selectedAnswer!.feedbackText}`;
  }

  private prepareNextQuestion(): void {
    this.buttonLabel = 'Verificar';
    this.advanceToNextItem();
    this.updateProgress();
  }

  private advanceToNextItem(): void {
    if (this.isContentDisplayed) {
      this.currentContentIndex++;
      this.isContentDisplayed = false;
    } else if (this.hasMoreQuestions()) {
      this.isContentDisplayed = true;
      this.loadNextQuestion();
    } else {
      this.completeQuiz();
    }
  }

  private updateProgress(): void {
    this.modalComponent.progressValue = this.calculateProgress();
  }

  private calculateProgress(): number {
    return ((this.currentQuestionIndex) / this.questions.length) * 100;
  }

  private loadNextQuestion(): void {
    this.currentQuestionIndex++;
    this.clearSelection();
    this.updateProgress();
  }

  private async completeQuiz(): Promise<void> {
    if (this.isQuizCompleted) {
      try {
        await Promise.all([
          this.updateLivesInBD(),
          this.updateUserScoreInBD()
        ]);

        this.finishLesson();
      } catch (error) {
        console.error('Erro ao finalizar quiz:', error);
      }
    }

    if (this.incorrectAnswers.length > 0) {
      alert('Vamos rever o que você errou!');
      this.retryIncorrectAnswers();
    } else {
      this.modalComponent.progressValue = 100;
      this.isQuizCompleted = true;
    }
  }

  private finishLesson(): void {
    this.lessonCompleted.emit(this.lives);
    this.toggleModal();
  }

  private processWrongAnswer(): void {
    this.decreaseLives();
    this.storeWrongAnswer();
  }

  private decreaseLives(): void {
    this.lives--;
    this.updateLivesInModal();
    this.updateLivesInBD();

    if (this.lives === 0) {
      alert('Você perdeu todas as suas vidas!');
      this.finishLesson();
    }
  }

  private storeWrongAnswer(): void {
    const previousContentIndex = this.currentContentIndex - 1;
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const currentContent = this.contents[previousContentIndex];
    if (!this.incorrectAnswers.includes(currentQuestion)) {
      this.incorrectAnswers.push(currentQuestion);
      this.incorrectContents.push(currentContent);
    }
  }

  private retryIncorrectAnswers(): void {
    this.questions = [...this.incorrectAnswers];
    this.contents = [...this.incorrectContents];
    this.incorrectAnswers = [];
    this.incorrectContents = [];
    this.currentQuestionIndex = 0;
    this.currentContentIndex = 0;
    this.isQuizCompleted = false;
    this.isContentDisplayed = true;
    this.clearSelection();
  }

  private hasMoreQuestions(): boolean {
    return this.currentQuestionIndex < this.questions.length - 1;
  }

  private clearSelection(): void {
    this.selectedAnswer = null;
    this.clearFeedback();
  }

  private clearFeedback(): void {
    this.feedbackMessage = null;
  }

  private updateLivesInModal(): void {
    this.modalComponent.decreaseLives(this.lives);
  }

  private async updateLivesInBD(): Promise<void> {
    try {
      localStorage.clear();
      const response: User = await lastValueFrom(this.userService.updateLives(this.userId, this.lives));
      localStorage.setItem('user', JSON.stringify(response));
      console.log('Vidas atualizadas com sucesso:', response.lives);
    } catch (error) {
      console.error('Erro ao atualizar vidas:', error);
    }
  }

  private async updateUserScoreInBD(): Promise<void> {
    try {
      localStorage.clear();
      const response: User = await lastValueFrom(this.userService.increaseScore(this.userId, this.selectedLesson.points));
      localStorage.setItem('user', JSON.stringify(response));
    } catch (error) {
      console.error('Erro ao atualizar pontuação:');
    }
  }
}
