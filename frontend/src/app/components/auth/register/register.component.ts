import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  usernameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.min(8),
  ]);

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    try {
      let username = this.usernameFormControl.value;
      let email = this.emailFormControl.value;
      let password = this.passwordFormControl.value;

      let user = new User(
        username || undefined,
        email || undefined,
        password || undefined
      );

      this.authService.register(user).subscribe(() => {
        alert('User Sucessfuly Added');
        this.router.navigate(['/auth/login/']);
      });
    } catch (err) {
      console.log(err);
    }
  }
}
