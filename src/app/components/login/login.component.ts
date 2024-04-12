import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      user: [null, [Validators.required]],
      password: [null, Validators.required],
    });
  }

  printForm(): void {
    console.log(this.form);
  }
}
