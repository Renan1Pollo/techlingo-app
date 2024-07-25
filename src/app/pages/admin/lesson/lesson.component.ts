import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenuAdminComponent } from '../../../components/sidebar-menu-admin/sidebar-menu-admin.component';

@Component({
    selector: 'app-lesson',
    standalone: true,
    templateUrl: './lesson.component.html',
    styleUrl: './lesson.component.scss',
    imports: [SidebarMenuAdminComponent, CommonModule]
})
export class LessonComponent {

  response!: Boolean;
  constructor(private router: Router) { }

  addLesson(): void {
    this.router.navigate(['/lessons/add']);
  }

  editLesson(lessonId: number): void {
    this.router.navigate(['/lessons', lessonId, 'edit']);
  }

  deleteLesson(lessonId: number): void {
    this.response = confirm("Você tem certeza que deseja excluir essa Licao?");

    if (this.response) {
      console.log('Excluido')
    }
  }
}
