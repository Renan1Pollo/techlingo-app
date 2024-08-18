import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../types/User.type';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterRequest } from '../../../types/Register.type';
import { SidebarMenuAdminComponent } from "../../../components/sidebar-menu-admin/sidebar-menu-admin.component";
import { InputComponent } from "../../../shared/input/input.component";

@Component({
  selector: 'app-new-admin',
  standalone: true,
  imports: [SidebarMenuAdminComponent, InputComponent],
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.scss']
})
export class NewAdminComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.showValidationError();
      return;
    }

    const userData = this.extractUserData();
    this.createAdmin(userData);
  }

  private extractUserData(): RegisterRequest {
    return {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
    };
  }

  private createAdmin(data: RegisterRequest): void {
    this.authService.createAdmin(data).subscribe({
      next: (user: User) => this.handleSuccess(user),
      error: (error: HttpErrorResponse) => this.handleError(error),
    });
  }

  private handleSuccess(user: User): void {
    alert('Administrador criado com sucesso!');
    this.router.navigate(['/admin']);
  }

  private handleError(error: HttpErrorResponse): void {
    if (error.status === 400) {
      alert('Usuário já existe');
    } else {
      console.error('Erro ao cadastrar', error);
      alert('Ocorreu um erro. Tente novamente mais tarde.');
    }
  }

  private showValidationError(): void {
    alert('Preencha todos os campos corretamente!');
  }
}
