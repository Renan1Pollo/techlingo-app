import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputComponent } from "../../../../shared/input/input.component";

@Component({
    selector: 'app-add-unit',
    standalone: true,
    templateUrl: './add-unit.component.html',
    styleUrl: './add-unit.component.scss',
    imports: [InputComponent]
})
export class AddUnitComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router) { }
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      curso: [null, [Validators.required]],
      titulo: [null, Validators.required],
      descricao: [null, Validators.required],
      pontos: [null, Validators.required],
      indice: [null, Validators.required],
    });
  }

  goBack(): void {

  }

  saveUnidade(): void {

  }
}
