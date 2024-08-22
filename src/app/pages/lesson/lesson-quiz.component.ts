import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AnswersCardComponent } from "../../components/answers-card/answers-card.component";
import { LearnModalComponent } from '../../components/learn-modal/learn-modal.component';
import { AnswerResponseDTO } from '../../types/Answer.type';
import { QuestionResponseDTO } from '../../types/Question.type';

@Component({
  selector: 'app-lesson-quiz',
  standalone: true,
  imports: [LearnModalComponent, CommonModule, AnswersCardComponent],
  templateUrl: './lesson-quiz.component.html',
  styleUrls: ['./lesson-quiz.component.scss']
})
export class LessonQuizComponent implements OnInit {
  @Input() questions: QuestionResponseDTO[] = [];

  selectedAnswer: AnswerResponseDTO | null = null;
  feedbackMessage: string | null = null;
  buttonLabel: string = 'Verificar';
  isModalOpen: boolean = true;
  showHeart: boolean = true;
  currentQuestionIndex: number = 0;
  isQuizCompleted: boolean = false;

  ngOnInit(): void {
    this.logQuestions();
  }

  logQuestions(): void {
    console.log(this.questions);
  }

  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }

  selectAnswer(answer: AnswerResponseDTO): void {
    this.selectedAnswer = answer;
    this.feedbackMessage = null;
  }

  verifyAnswer(): void {
    if (this.selectedAnswer && !this.feedbackMessage) {
      this.displayFeedback();
      this.buttonLabel = 'Continuar';
    } else {
      this.resetForNextQuestion();
    }
  }

  displayFeedback(): void {
    if (this.selectedAnswer) {
      this.feedbackMessage = this.selectedAnswer.correct
        ? `Resposta correta! ${this.selectedAnswer.feedbackText}`
        : `Resposta incorreta. ${this.selectedAnswer.feedbackText}`;
    }
  }

  resetForNextQuestion(): void {
    this.buttonLabel = 'Verificar';
    this.moveToNextQuestion();
  }

  moveToNextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.clearSelection();
    } else {
      this.isQuizCompleted = true;
    }
  }

  clearSelection(): void {
    this.selectedAnswer = null;
    this.feedbackMessage = null;
  }

  finishLesson(): void {
    this.toggleModal();
    console.log('Lesson finished!');
  }
}
