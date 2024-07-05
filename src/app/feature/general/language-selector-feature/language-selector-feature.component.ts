import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {LocalizationService} from "../../../../common/service/localization.service";
import {Language} from "../../../../common/model/language.model";

@Component({
  selector: 'app-language-selector-feature',
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  templateUrl: './language-selector-feature.component.html',
  styleUrl: './language-selector-feature.component.scss'
})
export class LanguageSelectorFeatureComponent {
  protected languageList: Language[] = LocalizationService.AVAILABLE_LANGUAGE_LIST;

  constructor(
      protected localizationService: LocalizationService
  ) { }

  changeLanguage(language: string | null): void {
    this.localizationService.changeLanguage(language as string);
  }
}
