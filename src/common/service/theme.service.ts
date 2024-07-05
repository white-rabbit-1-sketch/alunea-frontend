import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  protected static readonly THEME_STORAGE_KEY = 'theme';
  protected static readonly DEFAULT_THEME = 'dark';

  protected themeList: string[] = ['light', 'dark'];

  public initTheme(): void {
    let theme = localStorage.getItem(ThemeService.THEME_STORAGE_KEY);
    if (!theme) {
      theme = ThemeService.DEFAULT_THEME;
    }

    this.setTheme(theme);
  }

  public changeTheme(): void {
    const currentTheme = localStorage.getItem(ThemeService.THEME_STORAGE_KEY);

    this.themeList.forEach(theme => {
      if (theme != currentTheme) {
        this.setTheme(theme);

        return;
      }
    });
  }

  public setTheme(theme: string): void {
    const html = document.getElementsByTagName('html')[0];
    const body = document.getElementsByTagName('body')[0];
    this.themeList.forEach(currentTheme => {
      body.classList.remove(currentTheme);
    });

    html.setAttribute('data-bs-theme', theme);
    body.classList.add(theme);
    localStorage.setItem(ThemeService.THEME_STORAGE_KEY, theme);
  }
}
