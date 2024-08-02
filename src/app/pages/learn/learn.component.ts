import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../../components/modal/modal.component';
import { SidebarMenuComponent } from '../../components/sidebar-menu/sidebar-menu.component';
import { CourseService } from '../../services/course.service';
import { Course, CourseResponseDTO } from '../../types/Course.type';
import { CourseCardComponent } from '../admin/course/course-card/course-card.component';
import { UnitService } from '../../services/unit.service';
import { LessonService } from '../../services/lesson.service';
import { Unit } from '../../types/Unit.type';
import { Lesson } from '../../types/Lesson.type';

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
  ],
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss'],
})
export class LearnComponent implements OnInit {
  filterForm!: FormGroup<FilterForm>;
  isModalOpen = false;
  courses!: CourseResponseDTO[];
  selectedCourse: any;

  constructor(
    private courseService: CourseService,
    private unitService: UnitService,
    private lessonService: LessonService
  ) {}

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      locale: new FormControl(''),
      from: new FormControl(null),
      to: new FormControl(null),
    });

    this.getCourses();
    this.isModalOpen = true;
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

  getCourses(): void {
    this.courses = [];
    this.courseService.getAllCourses().subscribe((data: CourseResponseDTO[]) => {
      this.courses = data;
    });
  }
}
