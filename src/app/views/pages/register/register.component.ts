import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardBodyComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
} from '@coreui/angular';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    FormsModule,
    CommonModule,
  ],
})
export class RegisterComponent {
  form: any = {
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
    employeeId: null,
    role: [],
  };
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmitSignup(): void {
    const { username, email, password, confirmPassword, employeeId, role } =
      this.form;

    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    this.authService
      .register(employeeId, username, email, password, role)
      .subscribe({
        next: (data) => {
          this.successMessage = 'User registered successfully!';
          this.errorMessage = '';
        },
        error: (err) => {
          this.errorMessage =
            err.error.message || 'An error occurred during registration.';
          this.successMessage = '';
        },
      });
  }
}
