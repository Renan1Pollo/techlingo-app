import { Component } from '@angular/core';
import { SidebarMenuAdminComponent } from "../sidebar-menu-admin/sidebar-menu-admin.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-lesson',
    standalone: true,
    templateUrl: './lesson.component.html',
    styleUrl: './lesson.component.scss',
    imports: [SidebarMenuAdminComponent]
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
