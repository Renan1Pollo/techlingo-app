import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../types/Course.type';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.scss'
})
export class CourseCardComponent {
  @Input() course!: Course;
}
