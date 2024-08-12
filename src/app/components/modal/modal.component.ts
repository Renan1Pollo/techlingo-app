import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() isModalOpen!: boolean;
  @Input() showHeart!: boolean;
  @Output() closeModal = new EventEmitter();

  close() {
    this.closeModal.emit();
  }
}
