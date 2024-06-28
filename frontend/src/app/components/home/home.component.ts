import { Component } from '@angular/core';
import { ShowJikanComponent } from '../manga/show-jikan/show-jikan.component';
import { ShowMineComponent } from '../manga/show-mine/show-mine.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [ShowJikanComponent, ShowMineComponent],
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
