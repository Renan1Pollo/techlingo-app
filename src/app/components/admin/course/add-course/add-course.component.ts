import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { InputComponent } from "../../../../shared/input/input.component";
import { Router } from '@angular/router';
import { SidebarMenuAdminComponent } from "../../sidebar-menu-admin/sidebar-menu-admin.component";

@Component({
    selector: 'app-add-course',
    standalone: true,
    templateUrl: './add-course.component.html',
    styleUrl: './add-course.component.scss',
    imports: [InputComponent, SidebarMenuAdminComponent]
})
export class AddCourseComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router) { }
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [null, [Validators.required]],
      descricao: [null, Validators.required],
      image: [null, Validators.required],
    });
  }

  goBack(): void {
    this.router.navigate(['/courses']);
  }

  saveCurso(): void {
    if (this.form.valid) {
      console.log('Salvo');
    } else {
      alert('Formulário inválido')
      return;
    }

    this.router.navigate(['/courses']);
  }

}
