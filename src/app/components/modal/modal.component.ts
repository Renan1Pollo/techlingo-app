import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, WritableSignal } from '@angular/core';
import { User } from '../../types/User.type';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {
  @Input() isModalOpen!: boolean;
  @Input() showHeart!: boolean;
  @Output() closeModal = new EventEmitter();
  user!: User;

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  close() {
    this.closeModal.emit();
  }
}
