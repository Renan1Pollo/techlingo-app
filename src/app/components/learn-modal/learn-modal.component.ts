import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../types/User.type';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-learn-modal',
  standalone: true,
  imports: [],
  templateUrl: './learn-modal.component.html',
  styleUrls: ['./learn-modal.component.scss'],
})
export class LearnModalComponent implements OnInit {
  @Input() isModalOpen!: boolean;
  @Input() showHeart!: boolean;
  @Input() isQuizCompleted: boolean = false;

  @Output() closeModal = new EventEmitter<void>();
  @Output() continue = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  user: User = {
    id: 0,
    name: 'Usuário',
    email: 'email@example.com',
    password: '',
    score: 0,
    lives: 5,
    creationDate: new Date(),
    lastAccessDate:  new Date(),
    userRole: 'USER'
  };

  progressValue: number = 0;

  constructor(private cdr: ChangeDetectorRef, private userService: UserService) {
    this.updateProgress();
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  close() {
    this.closeModal.emit();
  }

  onContinue() {
    this.continue.emit();
  }

  decreaseLives(lives: number) {
    this.user.lives = lives;
    localStorage.setItem('user', JSON.stringify(this.user));
    this.cdr.detectChanges();
  }

  onBack() {
    this.back.emit();
  }

  updateProgress() {
    this.progressValue = 0;
  }
}
