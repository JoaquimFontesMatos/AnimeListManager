import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: string = 'light'; // Default theme

  // Define your theme colors here
  private themes: Record<string, Record<string, string>> = {
    light: {
      '--primary-color': 'hsl(220, 37%, 97%)',
      '--secondary-color': 'hsl(0, 0%, 91%)',
      '--accent-color': 'black',
      '--clr-text': 'black',
    },
    dark: {
      '--primary-color': '#181818',
      '--secondary-color': 'rgba(16, 70, 105, 0.404)',
      '--accent-color': 'rgba(44, 170, 255, 0.404)',
      '--clr-text': '#bbc8de',
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
    Object.keys(colors).forEach((key) => {
      root.style.setProperty(key, colors[key]);
    });
  }
}
