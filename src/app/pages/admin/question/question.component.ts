import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenuAdminComponent } from '../../../components/sidebar-menu-admin/sidebar-menu-admin.component';

@Component({
    selector: 'app-question',
    standalone: true,
    templateUrl: './question.component.html',
    styleUrl: './question.component.scss',
    imports: [SidebarMenuAdminComponent]
})
export class QuestionComponent {
  response!: Boolean;
  constructor(private router: Router) {}

  addQuestion(): void {
    this.router.navigate(['admin/questions/add']);
  }

  editQuestion(questionId: number): void {
    this.router.navigate(['admin/questions', questionId, 'edit']);
  }

  deleteQuestion(questionId: number): void {
    this.response = confirm(
      'Você tem certeza que deseja excluir essa Questao?'
    );

    if (this.response) {
      console.log('Excluido');
    }
  }
}
