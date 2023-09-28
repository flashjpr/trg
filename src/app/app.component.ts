import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from './store/app.reducer';
import { Store } from '@ngrx/store';
import { LocationActions } from './store/app.actions';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  currentLang!: string;

  constructor(
    private translate: TranslateService,
    private store: Store<AppState>,
  ) {
    this.initializeTranslation();
  }

  ngOnInit(): void {
    initFlowbite();
  }

  private initializeTranslation() {
    const defaultLang = 'en';
    const savedLang = localStorage.getItem('language');
    const langToUse = savedLang ? savedLang : defaultLang;
    this.currentLang = langToUse;

    this.translate.use(langToUse);
  }

  changeLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const chosenLang = selectElement.value;
    this.currentLang = chosenLang;

    localStorage.setItem('language', chosenLang);

    this.translate.use(chosenLang);
  }
}
