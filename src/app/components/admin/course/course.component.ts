import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent {

  constructor(private router: Router) { }

  addCursos(): void {
    this.router.navigate(['/add-cursos']);
  }

  editCursos(cursoId: number): void {
    this.router.navigate(['/courses', cursoId, 'edit']);
  }

}
