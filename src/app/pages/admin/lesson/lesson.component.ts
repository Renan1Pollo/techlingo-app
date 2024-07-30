import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenuAdminComponent } from '../../../components/sidebar-menu-admin/sidebar-menu-admin.component';
import { Lesson } from '../../../types/Lesson.type';
import { LessonService } from './../../../services/lesson.service';

@Component({
  selector: 'app-lesson',
  standalone: true,
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.scss',
  imports: [SidebarMenuAdminComponent, CommonModule],
})
export class LessonComponent implements OnInit {
  response!: Boolean;
  lessons!: Lesson[];

  constructor(private router: Router, private service: LessonService) {}

  ngOnInit(): void {
    this.getLessonData();
  }

  addLesson(): void {
    this.router.navigate(['/lessons/add']);
  }

  editLesson(lessonId: number): void {
    this.router.navigate(['/lessons', lessonId, 'edit']);
  }

  deleteLesson(lessonId: number): void {
    this.response = confirm('Você tem certeza que deseja excluir essa Licao?');

    if (this.response) {
      this.service.deleteLesson(lessonId).subscribe(() => {
        alert('Licao excluída!');
        this.getLessonData();
      });
    }
  }

  getLessonData(): void {
    this.lessons = [];
    this.service.getAllLessons().subscribe((data: Lesson[]) => {
      this.lessons = data;
    });
  }
}
