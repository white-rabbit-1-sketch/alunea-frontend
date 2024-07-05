import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {Language} from "../model/language.model";

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  public static readonly LANGUAGE_EN: Language = new Language('en', 'English');
  public static readonly LANGUAGE_RU: Language = new Language('ru', 'Русский');

  public static readonly AVAILABLE_LANGUAGE_LIST: Language[] = [
    LocalizationService.LANGUAGE_EN,
    LocalizationService.LANGUAGE_RU
  ];

  constructor(
      protected router: Router
  ) {
  }

  getCurrentLanguage(): string {
    return window.location.href.split('/')[3];
  }

  changeLanguage(language: string): void {
    let urlWithoutLanguage = this.router.url.replace(/^\/[a-zA-Z]{2}\//, '/');
    window.location.href = `/${language}${urlWithoutLanguage}`;
  }
}
