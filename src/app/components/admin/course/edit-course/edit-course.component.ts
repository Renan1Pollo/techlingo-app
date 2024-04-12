import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputComponent } from "../../../../shared/input/input.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.scss',
  imports: [InputComponent]
})
export class EditCourseComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [null, [Validators.required]],
      descricao: [null, Validators.required],
      image: [null, Validators.required],
    });

    this.route.params.subscribe(params => {
      const cursoId = +params['id'];
      console.log(cursoId);
    });
  }
}
