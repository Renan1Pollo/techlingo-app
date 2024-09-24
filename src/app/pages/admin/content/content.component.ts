import { Component, OnInit } from '@angular/core';
import { SidebarMenuAdminComponent } from "../../../components/sidebar-menu-admin/sidebar-menu-admin.component";
import { ContentService } from '../../../services/content.service';
import { Router } from '@angular/router';
import { Content } from '../../../types/Content.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [SidebarMenuAdminComponent, CommonModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent implements OnInit {
  response!: Boolean;
  contents!: Content[];

  constructor(private router: Router, private service: ContentService) { }

  ngOnInit(): void {
    this.getContentData();
  }

  editContent(contentId: number): void {
    this.router.navigate(['admin/contents', contentId, 'edit']);
  }

  deleteContent(contentId: number): void {
    this.response = confirm('Você tem certeza que deseja excluir esse Conteudo?');

    if (this.response) {
      this.service.deleteContent(contentId).subscribe(() => {
        alert('Conteudo excluído com sucesso!');
        this.getContentData();
      });
    }
  }

  getContentData(): void {
    this.contents = [];
    this.service.getAllContentDetails().subscribe((data: Content[]) => {
      this.contents = data;
    });
  }

}
