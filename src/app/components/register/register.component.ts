import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputComponent } from "../../shared/input/input.component";

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
    imports: [InputComponent]
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder) {}
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, null],
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  printForm(): void {
    console.log(this.form);
  }
}
