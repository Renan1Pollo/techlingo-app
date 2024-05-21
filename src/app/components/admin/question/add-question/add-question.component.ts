import { Component, OnInit } from '@angular/core';
import { InputComponent } from "../../../../shared/input/input.component";
import { SidebarMenuAdminComponent } from "../../sidebar-menu-admin/sidebar-menu-admin.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-question',
    standalone: true,
    templateUrl: './add-question.component.html',
    styleUrl: './add-question.component.scss',
    imports: [InputComponent, SidebarMenuAdminComponent]
})
export class AddQuestionComponent implements OnInit{
  constructor(private fb: FormBuilder, private router: Router) { }
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      licao: [null, [Validators.required]],
      descricao: [null, Validators.required],
      tipo: [null, Validators.required],
      indice: [null, Validators.required],
    });
  }

  goBack(): void {
    this.router.navigate(['/questions']);
  }

  saveLesson(): void {
    if (this.form.valid) {
      console.log('Salvo');
    } else {
      alert('Formulário inválido')
      return;
    }

    this.router.navigate(['/questions']);
  }
}
