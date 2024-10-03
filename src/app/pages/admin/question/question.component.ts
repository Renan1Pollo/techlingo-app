import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenuAdminComponent } from '../../../components/sidebar-menu-admin/sidebar-menu-admin.component';
import { Question } from '../../../types/Question.type';
import { QuestionService } from '../../../services/question.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question',
  standalone: true,
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
  imports: [SidebarMenuAdminComponent, CommonModule]
})
export class QuestionComponent {
  response!: Boolean;
  questions!: Question[];

  constructor(private router: Router, private service: QuestionService) { }

  ngOnInit(): void {
    this.getQuestionData();
  }

  editQuestion(questionId: number): void {
    this.router.navigate(['admin/questions', questionId, 'edit']);
  }

  deleteQuestion(questionId: number): void {
    this.response = confirm('Você tem certeza que deseja excluir essa Pergunta?');

    if (this.response) {
      this.service.deleteQuestion(questionId).subscribe(() => {
        alert('Pergunta excluída com sucesso!');
        this.getQuestionData();
      });
    }
  }

  private getQuestionData(): void {
    this.questions = [];
    this.service.getAllQuestionDetails().subscribe((data: Question[]) => {
      this.questions = data;
    });
  }
}
