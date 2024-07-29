import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { InputComponent } from '../../shared/input/input.component';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, Validators.required],
    });
  }

  submit(): void {
    if (this.form.invalid) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    const data = this.getUserData();
    this.service.login(data).subscribe({
      next: (response: any) => {
        alert('Usuario Logado com sucesso!');
        this.router.navigate(['/home']);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          alert('Usuário nao encontrado');
        } else {
          console.error('Error posting event', error);
        }
      },
    });
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }

  getUserData() {
    return {
      email: this.form.value.email,
      password: this.form.value.password,
    };
  }
}
