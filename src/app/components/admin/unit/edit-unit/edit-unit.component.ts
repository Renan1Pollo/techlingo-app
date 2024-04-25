import { Component, OnInit } from '@angular/core';
import { SidebarMenuAdminComponent } from "../../sidebar-menu-admin/sidebar-menu-admin.component";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputComponent } from "../../../../shared/input/input.component";

@Component({
    selector: 'app-edit-unit',
    standalone: true,
    templateUrl: './edit-unit.component.html',
    styleUrl: './edit-unit.component.scss',
    imports: [SidebarMenuAdminComponent, InputComponent]
})
export class EditUnitComponent  implements OnInit {

  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      curso: [null, [Validators.required]],
      titulo: [null, Validators.required],
      descricao: [null, Validators.required],
      pontos: [null, Validators.required],
      indice: [null, Validators.required],
    });

    this.route.params.subscribe(params => {
      const unidadeId = +params['id'];
      console.log(unidadeId);
    });
  }

  goBack(): void {
    this.router.navigate(['/units']);
  }

  saveUnidade(): void {
    if (this.form.valid) {
      console.log('Salvo');
    } else {
      alert('Formulário inválido')
      return;
    }

    this.router.navigate(['/courses']);
  }
}
