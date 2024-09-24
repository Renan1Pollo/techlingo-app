import { User } from './../../types/User.type';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../../components/modal/modal.component';
import { SidebarMenuComponent } from '../../components/sidebar-menu/sidebar-menu.component';
import { CourseService } from '../../services/course.service';
import { CourseResponseDTO } from '../../types/Course.type';
import { LessonQuizComponent } from '../lesson/lesson-quiz.component';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { EnrollmentService } from '../../services/enrollment.service';

interface FilterForm {
  locale: FormControl;
  from: FormControl;
  to: FormControl;
}

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [
    SidebarMenuComponent,
    ModalComponent,
    ReactiveFormsModule,
    CourseCardComponent,
    CommonModule,
    LessonQuizComponent
  ],
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss'],
})
export class LearnComponent implements OnInit {
  filterForm!: FormGroup<FilterForm>;
  isModalOpen = false;
  courses!: CourseResponseDTO[];
  selectedCourse: any;
  selectedLesson: any
  user!: User;

  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) { }

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      locale: new FormControl(''),
      from: new FormControl(null),
      to: new FormControl(null),
    });

    this.getCourses();
    this.isModalOpen = true;

    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  submit() {
    this.isModalOpen = false;
  }

  selectCourse(course: CourseResponseDTO) {
    this.selectedCourse = course;
    this.isModalOpen = false;
  }

  openLesson(lesson: any) {
    this.selectedLesson = null;
    setTimeout(() => {
      this.selectedLesson = lesson;
    }, 0);
  }

  onLessonCompleted(livesLeft: number): void {
    this.user.lives = livesLeft;
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  registerUserInCourse(): void {
    if (this.selectedCourse) return;
    //const enrollment = this.enrollmentService.findEnrollment(this.user.id, this, this.selectedCourse.id);

    //if (enrollment != null) {
      //Ja possui matricula

      //return;
    //}

    //this.enrollmentService.registerForCourse(this.user.id, this, this.selectedCourse.id);
  }

  getCourses(): void {
    this.courses = [];
    this.courseService.getAllCourses().subscribe((data: CourseResponseDTO[]) => {
      this.courses = data;
    });
  }
}
