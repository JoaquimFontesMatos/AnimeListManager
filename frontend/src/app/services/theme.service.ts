import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: string;

  // Define your theme colors here
  private themes: Record<string, Record<string, string>> = {
    light: {
      '--primary-color': 'rgb(245, 246, 250) ',
      '--secondary-color': 'rgb(232, 232, 232)',
      '--secondary-color-value': '232, 232, 232',
      '--accent-color': 'rgb(0,0,0)',
      '--clr-text': 'rgb(0,0,0)',
      '--clr-text-disabled': 'rgb(187, 200, 222)',
      '--invert': 'invert(0)',
    },
    dark: {
      '--primary-color': 'rgb(24, 24, 24)',
      '--secondary-color': 'rgb(11, 44, 67)',
      '--secondary-color-value': '11, 44, 67',
      '--accent-color': 'rgb(44, 170, 255)',
      '--clr-text': 'rgb(187, 200, 222)',
      '--clr-text-disabled': 'rgba(187, 200, 222,0.418)',
      '--invert': 'invert(1)',
    },
  };

  constructor() {
    let themeStored = localStorage.getItem('theme');

    if (themeStored) {
      document.documentElement.setAttribute('data-theme', themeStored);
      this.currentTheme = themeStored;
    } else {
      this.currentTheme = 'dark';
    }

    this.setTheme(this.currentTheme);
  }

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
      localStorage.setItem('theme', this.currentTheme);
    }
  }

  private async applyTheme(colors: Record<string, string>): Promise<void> {
    const root = document.documentElement;
    Object.keys(colors).forEach((key) => {
      root.style.setProperty(key, colors[key]);
    });
  }
}
