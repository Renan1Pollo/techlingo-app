import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenuAdminComponent } from "../sidebar-menu-admin/sidebar-menu-admin.component";

@Component({
    selector: 'app-unit',
    standalone: true,
    templateUrl: './unit.component.html',
    styleUrl: './unit.component.scss',
    imports: [SidebarMenuAdminComponent]
})
export class UnitComponent {

  response!: Boolean;
  constructor(private router: Router) { }

  addUnidade(): void {
    this.router.navigate(['/units/add']);
  }

  editUnidade(unidadeId: number): void {
    this.router.navigate(['/units', unidadeId, 'edit']);
  }

  deleteUnidade(unidadeId: number): void {
    this.response = confirm("Você tem certeza que deseja excluir essa Unidade?");

    if (this.response) {
      console.log('Excluido')
    }
  }
}
