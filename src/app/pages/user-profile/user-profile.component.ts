import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, OnInit } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { SidebarMenuComponent } from "../../components/sidebar-menu/sidebar-menu.component";
import { CourseResponseDTO } from '../../types/Course.type';
import { EnrollmentResponseDTO } from '../../types/Enrollment.type';
import { User } from '../../types/User.type';
import { EnrollmentService } from './../../services/enrollment.service';

registerLocaleData(localePt);

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [SidebarMenuComponent, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [DatePipe]
})
export class UserProfileComponent implements OnInit {
  user!: User;
  courses: CourseResponseDTO[] = [];

  constructor(
    private enrollmentService: EnrollmentService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadUserEnrollments();
  }

  private loadUserProfile(): void {
    this.user = this.getUserFromLocalStorage();
  }

  private getUserFromLocalStorage(): User {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : {} as User;
  }

  private loadUserEnrollments(): void {
    this.enrollmentService.getEnrollmentsByUserId(this.user.id)
      .pipe(
        tap(enrollments => this.extractCourses(enrollments)),
        catchError(this.handleError('Error fetching enrollments'))
      )
      .subscribe();
  }

  private extractCourses(enrollments: EnrollmentResponseDTO[]): void {
    this.courses = enrollments.map(enrollment => enrollment.course);
  }

  private handleError(message: string) {
    return (error: any) => {
      console.error(message, error);
      return throwError(() => new Error(message));
    };
  }

  getFormattedCreationDate(): string {
    const monthYear = this.datePipe.transform(this.user.creationDate, 'MMMM yyyy', 'UTC', 'pt');
    return monthYear ? monthYear.replace(' ', ' de ') : '';
  }
}
