import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeSelectorComponent } from '../theme-selector/theme-selector.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgbCollapseModule, RouterLink, ThemeSelectorComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  isMenuCollapsed = true;

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
