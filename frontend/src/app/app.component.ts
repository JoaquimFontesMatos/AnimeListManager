import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/extras/nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Just Another List';

  constructor(private router: Router) {}

  validNavLocation(): boolean {
    if (
      this.router.url != '/' &&
      !this.router.url.includes('/#login') &&
      !this.router.url.includes('/auth')
    ) {
      return true;
    }
    return false;
  }
}
