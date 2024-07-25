import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarMenuAdminComponent } from '../../../../components/sidebar-menu-admin/sidebar-menu-admin.component';
import { InputComponent } from '../../../../shared/input/input.component';

@Component({
  selector: 'app-add-lesson',
  standalone: true,
  templateUrl: './add-lesson.component.html',
  styleUrl: './add-lesson.component.scss',
  imports: [SidebarMenuAdminComponent, InputComponent],
})
export class AddLessonComponent implements OnInit {
  constructor(private fb: FormBuilder, private router: Router) {}
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      unidade: [null, [Validators.required]],
      titulo: [null, Validators.required],
      descricao: [null, Validators.required],
      pontos: [null, Validators.required],
      indice: [null, Validators.required],
    });
  }

  goBack(): void {
    this.router.navigate(['/lessons']);
  }

  saveLesson(): void {
    if (this.form.valid) {
      console.log('Salvo');
    } else {
      alert('Formulário inválido');
      return;
    }

    this.router.navigate(['/lessons']);
  }
}
