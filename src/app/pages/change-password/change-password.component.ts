import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from '../../components/modal/modal.component';
import { SidebarMenuAdminComponent } from '../../components/sidebar-menu-admin/sidebar-menu-admin.component';
import { SidebarMenuComponent } from '../../components/sidebar-menu/sidebar-menu.component';
import { UserService } from '../../services/user.service';
import { InputComponent } from '../../shared/input/input.component';
import { User } from '../../types/User.type';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    ModalComponent,
    InputComponent,
    CommonModule,
    ReactiveFormsModule,
    SidebarMenuComponent,
    SidebarMenuAdminComponent,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent implements OnInit {
  form!: FormGroup;
  isModalOpen = true;
  user!: User;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      oldPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
    });

    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  submit(): void {
    if (this.form.invalid) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    const data = this.getUserData();

    this.userService.updatePassword(this.user.id, data.oldPassword, data.newPassword).subscribe({
      next: (response) => {
        alert('Senha Atualizada com sucesso');

        const updatedUser = { ...this.user, password: data.newPassword };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        this.router.navigate(['/learn']);
      },
       error: (errorResponse) => {
        if (errorResponse.status === 400) {
          alert('Senha Incorreta');
        } else {
          alert('Ocorreu um erro. Tente novamente mais tarde.');
        }
      },
    });
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  getUserData() {
    return {
      oldPassword: this.form.value.oldPassword,
      newPassword: this.form.value.newPassword,
    };
  }
}
