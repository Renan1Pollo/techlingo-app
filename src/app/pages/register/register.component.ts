import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { InputComponent } from '../../shared/input/input.component';
import { User } from '../../types/User.type';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [InputComponent, CommonModule, ReactiveFormsModule],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  submit(): void {
    if (this.form.invalid) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    const data = this.getUserData();
    this.service.register(data).subscribe({
      next: (response: User) => {
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['/learn']);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 400) {
          alert('Usuário já existe');
        } else {
          console.error('Erro ao cadastrar', error);
        }
      },
    });
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  getUserData() {
    return {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
    };
  }
}
