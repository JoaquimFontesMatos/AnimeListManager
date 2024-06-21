import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Just Another List';

  constructor(public themeService: ThemeService) {}

  toggleTheme(): void {
    const newTheme =
      this.themeService.currentThemeName === 'light' ? 'dark' : 'light';
    this.themeService.setTheme(newTheme);
    console.log(this.themeService.currentThemeColors);
    
  }
}
