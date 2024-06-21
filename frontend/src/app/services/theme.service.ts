import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: string = 'dark'; // Default theme

  // Define your theme colors here
  private themes: Record<string, Record<string, string>> = {
    light: {
      '--primary-color': 'hsl(220, 37%, 97%)',
      '--secondary-color': 'hsl(0, 0%, 91%)',
      '--accent-color': 'black',
      '--clr-text': 'black',
      '--invert': 'invert(0)',
    },
    dark: {
      '--primary-color': '#181818',
      '--secondary-color': 'rgba(11, 44, 67, 0.404)',
      '--accent-color': 'rgba(44, 170, 255, 0.404)',
      '--clr-text': '#bbc8de',
      '--invert': 'invert(1)',
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

  async setTheme(themeName: string): Promise<void> {
    if (this.themes[themeName]) {
      this.currentTheme = themeName;
      await this.applyTheme(this.themes[themeName]);
    }
  }

  private async applyTheme(colors: Record<string, string>): Promise<void> {
    const root = document.documentElement;
    Object.keys(colors).forEach((key) => {
      root.style.setProperty(key, colors[key]);
    });
  }
}
