import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unit',
  standalone: true,
  imports: [],
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.scss'
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
    this.response = confirm("Você tem certeza que deseja excluir esse curso?");

    if (this.response) {
      console.log('Excluido')
    }
  }
}
