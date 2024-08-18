import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../../components/modal/modal.component';
import { InputComponent } from '../../shared/input/input.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarMenuComponent } from "../../components/sidebar-menu/sidebar-menu.component";
import { SidebarMenuAdminComponent } from "../../components/sidebar-menu-admin/sidebar-menu-admin.component";

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ModalComponent, InputComponent, CommonModule, ReactiveFormsModule, SidebarMenuComponent, SidebarMenuAdminComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent implements OnInit {
  form!: FormGroup;
  isUser = false;
  isModalOpen = true;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      password: [null, Validators.required],
    });
  }

  submit(): void {
    if (this.form.invalid) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    const data = this.getUserData();
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  getUserData() {
    return {
      password: this.form.value.password,
    };
  }
}
