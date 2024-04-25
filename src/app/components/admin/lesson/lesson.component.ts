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

  addUnidade(): void {
    this.router.navigate(['/lessons/add']);
  }

  editLesson(unidadeId: number): void {
    this.router.navigate(['/lessons', unidadeId, 'edit']);
  }

  deleteLesson(unidadeId: number): void {
    this.response = confirm("Você tem certeza que deseja excluir essa Unidade?");

    if (this.response) {
      console.log('Excluido')
    }
  }
}
