import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenuAdminComponent } from '../../../components/sidebar-menu-admin/sidebar-menu-admin.component';
import { AnswerService } from '../../../services/answer.service';
import { Answer } from '../../../types/Answer.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [SidebarMenuAdminComponent, CommonModule],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.scss',
})
export class AnswerComponent implements OnInit {
  response!: Boolean;
  answers!: Answer[];

  constructor(private router: Router, private service: AnswerService) {}

  ngOnInit(): void {
    this.getAnswerData();
  }

  editAnswer(answerId: number): void {
    this.router.navigate(['admin/answers', answerId, 'edit']);
  }

  deleteAnswer(answerId: number): void {
    this.response = confirm(
      'Você tem certeza que deseja excluir essa Resposta?'
    );

    if (this.response) {
      this.service.deleteAnswer(answerId).subscribe(() => {
        alert('Resposta excluída com sucesso!');
        this.getAnswerData();
      });
    }
  }

  private getAnswerData(): void {
    this.answers = [];
    this.service.getAllAnswerDetails().subscribe((data: Answer[]) => {
      this.answers = data;
    });
  }
}
