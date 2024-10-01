import { Component, OnInit } from '@angular/core';
import { SidebarMenuComponent } from "../../components/sidebar-menu/sidebar-menu.component";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [SidebarMenuComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  userProfile: any;

  constructor() { }

  ngOnInit(): void {
    // Dados fictícios, substitua pelos dados reais que vêm do seu serviço ou API
    this.userProfile = {
      username: 'JohnDoe',
      createdAt: new Date(2022, 5, 15), // Data de criação do usuário
      courses: [
        { name: 'Curso de Angular', imageUrl: '' },
        { name: 'Curso de TypeScript', imageUrl: '' },
        { name: 'Curso de UX Design', imageUrl: '' }
      ]
    };
  }
}
