import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { InputComponent } from "../../../../shared/input/input.component";

@Component({
  selector: 'app-add-course',
  standalone: true,
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.scss',
  imports: [InputComponent]
})
export class AddCourseComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [null, [Validators.required]],
      descricao: [null, Validators.required],
      image: [null, Validators.required],
    });
  }

  printForm(): void {
    console.log(this.form);
  }
}
