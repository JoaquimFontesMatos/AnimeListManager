import { Component } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [],
  templateUrl: './theme-selector.component.html',
  styleUrl: './theme-selector.component.css',
})
export class ThemeSelectorComponent {
  constructor(public themeService: ThemeService) {}

  toggleTheme(): void {
    const newTheme =
      this.themeService.currentThemeName === 'light' ? 'dark' : 'light';
    this.themeService.setTheme(newTheme);
  }
}
