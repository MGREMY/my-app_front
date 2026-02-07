import { AuthService } from '@my-app/core/api/auth/auth.service';
import { APP_TRANSLATION_SERVICE } from '@my-app/core/translation.service';
import { UiMenu, UiMenuItem } from '@my-app/ui/menu';
import { UiNavbar, UiNavbarContent, UiNavbarItem } from '@my-app/ui/navbar';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { flagCp, flagUs } from '@ng-icons/flag-icons';
import { heroBars4, heroUserCircle } from '@ng-icons/heroicons/outline';
import { TranslatePipe } from '@ngx-translate/core';

import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgpMenu, NgpMenuItem, NgpMenuTrigger } from 'ng-primitives/menu';

@Component({
  selector: 'app-root',
  imports: [
    UiNavbar,
    UiNavbarContent,
    UiNavbarItem,
    UiMenu,
    UiMenuItem,
    NgpMenu,
    NgpMenuItem,
    NgpMenuTrigger,
    NgIcon,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
    TitleCasePipe,
  ],
  templateUrl: './app.component.html',
  providers: [provideIcons({ flagCp, flagUs, heroUserCircle, heroBars4 })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  private readonly _translationService = inject(APP_TRANSLATION_SERVICE);
  protected readonly _authService = inject(AuthService);

  protected readonly _availableLanguages = [
    {
      code: 'fr-FR',
      name: 'Français',
      icon: 'flagCp',
    },
    {
      code: 'en-US',
      name: 'English',
      icon: 'flagUs',
    },
  ];

  protected readonly _currentLanguageIcon = computed(
    () =>
      this._availableLanguages.find((x) => x.code === this._translationService.currentLanguage())
        ?.icon ?? ''
  );

  onSetLang(code: string): void {
    this._translationService.setLanguage(code);
  }
}
