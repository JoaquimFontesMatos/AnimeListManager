import { Component, ViewEncapsulation } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BackgroundComponent } from '../../extras/background/background.component';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
    MatProgressBarModule,
    BackgroundComponent,
  ],
})
export class LoginComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  loading: boolean = false;
  error?: string;
  loggedIn?: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    if (localStorage.getItem('currentUser')) {
      this.loggedIn = true;
    }
  }

  login() {
    try {
      const email = this.emailFormControl.value;
      const password = this.passwordFormControl.value;

      if (!email || !password || email == null || password == null) {
        console.log('Invalid Values');
      } else {
        this.loading = true;
        this.authService.login(email, password).subscribe(
          (user: any) => {
            this.loading = false;
            if (user?.token) {
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.router.navigate(['/home/']);
            }
          },
          (error) => {
            this.error = error.error.message;
            this.loading = false;
            console.log(error);
          }
        );
      }
    } catch (err) {
      this.loading = false;
      console.log(err);
    }
  }

  register() {
    this.router.navigate(['/auth/register/']);
  }

  enter() {
    this.router.navigate(['/home/']);
  }
}
