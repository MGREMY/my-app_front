import { AuthService } from '@my-app/core/api/auth/auth.service';
import { APP_TRANSLATION_SERVICE } from '@my-app/core/translation.service';
import { UiButton } from '@my-app/ui/button';
import { UiMenu, UiMenuItem } from '@my-app/ui/menu';
import { UiNavbar, UiNavbarContent, UiNavbarItem } from '@my-app/ui/navbar';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { flagCp, flagUs } from '@ng-icons/flag-icons';
import { heroUserCircle } from '@ng-icons/heroicons/outline';
import { TranslatePipe } from '@ngx-translate/core';

import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgpMenuTrigger } from 'ng-primitives/menu';

@Component({
  selector: 'app-root',
  imports: [
    UiNavbar,
    UiNavbarContent,
    UiNavbarItem,
    UiButton,
    UiMenu,
    UiMenuItem,
    NgIcon,
    NgpMenuTrigger,
    RouterOutlet,
    RouterLink,
    TranslatePipe,
    TitleCasePipe,
  ],
  templateUrl: './app.component.html',
  providers: [provideIcons({ flagCp, flagUs, heroUserCircle })],
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

  protected readonly _isLoggedIn = toSignal(this._authService.isLoggedIn());

  onSetLang(code: string): void {
    this._translationService.setLanguage(code);
  }
}
