import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { SidebarMenuComponent } from '../../components/sidebar-menu/sidebar-menu.component';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { CourseResponseDTO } from '../../types/Course.type';
import { LessonQuizComponent } from '../lesson/lesson-quiz.component';
import {
  Enrollment,
  EnrollmentResponseDTO,
} from './../../types/Enrollment.type';
import { User } from './../../types/User.type';
import { catchError, EMPTY, Observable, of, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [
    SidebarMenuComponent,
    ModalComponent,
    ReactiveFormsModule,
    CourseCardComponent,
    CommonModule,
    LessonQuizComponent,
  ],
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss'],
})
export class LearnComponent implements OnInit {
  isModalOpen = false;
  showSidebar = true;
  courses: CourseResponseDTO[] = [];
  selectedCourse!: CourseResponseDTO;
  selectedLesson: any;
  enrollment!: Enrollment;
  user!: User;

  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) {}

  @HostListener('window:resize')
  onResize() {
    this.checkWindowSize();
  }

  checkWindowSize() {
    this.showSidebar = window.innerWidth > 1000;
  }

  ngOnInit(): void {
    this.initializeUser();
    this.loadCourses();
    this.toggleModal();
    this.checkWindowSize();
  }

  private initializeUser(): void {
    const userData = localStorage.getItem('user');
    this.user = userData ? JSON.parse(userData) : ({} as User);
  }

  private loadCourses(): void {
    this.courseService
      .getAllCourses()
      .subscribe((data: CourseResponseDTO[]) => {
        this.courses = data;
      });
  }

  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }

  submit(): void {
    this.isModalOpen = false;
  }

  selectCourse(course: CourseResponseDTO): void {
    this.selectedCourse = course;
    this.fetchUserEnrollment();
    this.toggleModal();
  }

  openLesson(lesson: any): void {
    if (this.user.lives === 0) {
      const minutesRemaining = this.calculateTime();
      if (minutesRemaining > 0) {
        alert(`Que pena, suas vidas acabaram! Por favor, aguarde ${minutesRemaining} minutos para ganhar uma nova vida e tente novamente.`);
      } else {
        alert('Que pena, suas vidas acabaram! Você já pode ganhar uma nova vida. Recarregue a página.');
      }
      return;
    }

    this.selectedLesson = null;
    setTimeout(() => {
      this.selectedLesson = lesson;
    });
  }

  onLessonCompleted(): void {
    this.initializeUser();
  }

  private fetchUserEnrollment(): void {
    if (!this.selectedCourse) {
      return;
    }

    this.enrollmentService.getEnrollmentByUserAndCourse(this.user.id, this.selectedCourse.id).pipe(
      tap(result => result ? this.handleEnrollmentFound(result) : this.registerUserInCourse()),
      catchError(error => { return throwError(() => new Error('Error fetching enrollment')); })
    ).subscribe();
  }

  private handleEnrollmentFound(result: Enrollment): void {
    this.enrollment = result;
    console.log('Enrollment found:', this.enrollment);
  }

  private registerUserInCourse(): void {
    const enrollmentData = this.createEnrollmentData();
    this.enrollmentService.registerForCourse(enrollmentData).subscribe({
      next: (enrollment: EnrollmentResponseDTO) => {
        this.enrollment = enrollment;
      },
    });
  }

  private createEnrollmentData(): Enrollment {
    return {
      id: null,
      user: this.user,
      course: this.selectedCourse,
    };
  }

  private calculateTime(): number {
    const lastAccess: Date = new Date(this.user.lastAccessDate);
    const now: Date = new Date();
    const minutesPassed: number = Math.floor((now.getTime() - lastAccess.getTime()) / (1000 * 60));

    if (minutesPassed >= 10) {
      const livesToAdd: number = Math.floor(minutesPassed / 10);
      this.user.lives = Math.min(this.user.lives + livesToAdd, 5);

      if (livesToAdd > 0) {
        this.user.lastAccessDate = now;
      }
      return 0;
    } else {
      const minutesRemaining: number = 10 - minutesPassed;
      return minutesRemaining;
    }
  }

  generateReport(unitId: number): void {
    this.enrollmentService.generateReport(unitId).subscribe((reportData: Blob) => {
      const blob = new Blob([reportData], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    }, () => {
      console.error('Erro ao gerar o relatório:');
    });
  }

}
