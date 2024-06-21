import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: string = 'light'; // Default theme

  // Define your theme colors here
  private themes: Record<string, Record<string, string>> = {
    light: {
      '--primary-color': '#007bff',
      '--secondary-color': '#6c757d',
      // Add more colors as needed
    },
    dark: {
      '--primary-color': '#343a40',
      '--secondary-color': '#17a2b8',
      // Add more colors as needed
    },
  };

  // Getter for the current theme
  get currentThemeName(): string {
    return this.currentTheme;
  }

  // Getter for the current theme's color variables
  get currentThemeColors(): Record<string, string> {
    return this.themes[this.currentTheme];
  }

  // Method to set the theme
  setTheme(themeName: string): void {
    if (this.themes[themeName]) {
      this.currentTheme = themeName;
      this.applyTheme(this.themes[themeName]);
    }
  }

  // Method to apply the theme's colors to the document root
  private applyTheme(colors: Record<string, string>): void {
    const root = document.documentElement;
    Object.keys(colors).forEach(key => {
      root.style.setProperty(key, colors[key]);
    });
  }
}
