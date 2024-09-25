import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { SidebarMenuComponent } from '../../components/sidebar-menu/sidebar-menu.component';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { CourseResponseDTO } from '../../types/Course.type';
import { LessonQuizComponent } from '../lesson/lesson-quiz.component';
import { Enrollment } from './../../types/Enrollment.type';
import { User } from './../../types/User.type';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

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
  courses: CourseResponseDTO[] = [];
  selectedCourse!: CourseResponseDTO;
  selectedLesson: any;
  enrollment!: Enrollment;
  user!: User;

  constructor(private courseService: CourseService, private enrollmentService: EnrollmentService) {}

  ngOnInit(): void {
    this.initializeUser();
    this.loadCourses();
    this.toggleModal();
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
    this.selectedLesson = null;
    setTimeout(() => {
      this.selectedLesson = lesson;
    });
  }

  onLessonCompleted(livesLeft: number): void {
    this.user.lives = livesLeft;
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  private fetchUserEnrollment(): void {
    if (!this.selectedCourse) {
      return;
    }

    this.enrollmentService.getEnrollmentByUserAndCourse(this.user.id, this.selectedCourse.id).pipe(
      tap((result) => this.handleEnrollmentFound(result)),
      catchError(() => this.registerUserInCourse())
    ).subscribe();
  }

  private handleEnrollmentFound(result: Enrollment): void {
    this.enrollment = result;
    console.log('Enrollment found:', this.enrollment);
  }

  private registerUserInCourse(): Observable<Enrollment> {
    const enrollmentData = this.createEnrollmentData();

    return this.enrollmentService.registerForCourse(enrollmentData).pipe(
      tap((newEnrollment) => {
        this.enrollment = newEnrollment;
        console.log('Successfully enrolled:', this.enrollment);
      }),
      catchError((registrationError) => {
        console.error('Enrollment error:', registrationError.message || registrationError);
        return EMPTY;
      })
    );
  }

  private createEnrollmentData(): Enrollment {
    return {
      id: null,
      user: this.user,
      course: this.selectedCourse,
    };
  }
}
