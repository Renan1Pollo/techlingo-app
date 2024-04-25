import { Component, OnInit } from '@angular/core';
import { SidebarMenuAdminComponent } from "../../sidebar-menu-admin/sidebar-menu-admin.component";
import { InputComponent } from "../../../../shared/input/input.component";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-edit-lesson',
    standalone: true,
    templateUrl: './edit-lesson.component.html',
    styleUrl: './edit-lesson.component.scss',
    imports: [SidebarMenuAdminComponent, InputComponent]
})
export class EditLessonComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      unidade: [null, [Validators.required]],
      titulo: [null, Validators.required],
      descricao: [null, Validators.required],
      pontos: [null, Validators.required],
      indice: [null, Validators.required],
    });

    this.route.params.subscribe(params => {
      const lessonId = +params['id'];
      console.log(lessonId);
    });
  }

  goBack(): void {
    this.router.navigate(['/lessons']);
  }

  saveLesson(): void {
    if (this.form.valid) {
      console.log('Salvo');
    } else {
      alert('Formulário inválido')
      return;
    }

    this.router.navigate(['/lessons']);
  }
}
