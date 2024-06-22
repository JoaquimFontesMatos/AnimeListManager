import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
    MatProgressBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None, // Disable view encapsulation
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.min(8),
  ]);
  loading: boolean = false;

  images: string[] = [
    '/assets/login.jpeg',
    '/assets/login2.jpg',
    '/assets/login3.jpg',
  ];

  currentImageIndex = 0;

  ngOnInit() {
    setInterval(() => {
      this.currentImageIndex++;
      if (this.currentImageIndex >= this.images.length) {
        this.currentImageIndex = 0;
      }
    }, 60 * 1000); // Change image every minute
  }

  constructor(private authService: AuthService, private router: Router) {}

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
            } else {
              alert('Login Error!');
            }
          },
          (error) => {
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
}
