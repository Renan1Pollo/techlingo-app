import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputComponent } from "../../../../shared/input/input.component";
import { SidebarMenuAdminComponent } from '../../../../components/sidebar-menu-admin/sidebar-menu-admin.component';

@Component({
    selector: 'app-edit-question',
    standalone: true,
    templateUrl: './edit-question.component.html',
    styleUrl: './edit-question.component.scss',
    imports: [SidebarMenuAdminComponent, InputComponent]
})
export class EditQuestionComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      licao: [null, [Validators.required]],
      descricao: [null, Validators.required],
      tipo: [null, Validators.required],
      indice: [null, Validators.required],
    });

    this.route.params.subscribe(params => {
      const questionId = +params['id'];
      console.log(questionId);
    });
  }

  goBack(): void {
    this.router.navigate(['admin/questions']);
  }

  saveQuestion(): void {
    if (this.form.valid) {
      console.log('Salvo');
    } else {
      alert('Formulário inválido')
      return;
    }

    this.router.navigate(['/questions']);
  }
}
