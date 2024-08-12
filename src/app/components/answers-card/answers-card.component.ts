import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnswerResponseDTO } from '../../types/Answer.type';

@Component({
  selector: 'app-answers-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './answers-card.component.html',
  styleUrl: './answers-card.component.scss'
})
export class AnswersCardComponent {
  @Input() answer!: AnswerResponseDTO;
  @Input() selectedAnswer!: AnswerResponseDTO | null;
  @Input() feedbackMessage!: string | null;
  @Output() answerSelected = new EventEmitter<AnswerResponseDTO>();

  selectAnswer() {
    if (!this.feedbackMessage) {
      this.answerSelected.emit(this.answer);
    }
  }
}
