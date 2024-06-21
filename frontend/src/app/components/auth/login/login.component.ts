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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None, // Disable view encapsulation
})
export class LoginComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.min(8),
  ]);

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    try {
      const email = this.emailFormControl.value;
      const password = this.passwordFormControl.value;

      if (!email || !password || email == null || password == null) {
        console.log('Invalid Values');
      } else {
        this.authService.login(email, password).subscribe((user: any) => {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.router.navigate(['/home/']);
          } else {
            alert('Login Error!');
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  register() {
    this.router.navigate(['/auth/register/']);
  }
}
