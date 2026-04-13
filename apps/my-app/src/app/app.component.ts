import { AppNavbarContent } from '@my-app/shared/components/navbar/navbar-content.component';
import { AppNavbarItem } from '@my-app/shared/components/navbar/navbar-item.component';
import { AppNavbar } from '@my-app/shared/components/navbar/navbar.component';

import { AuthService } from '@/core/api/auth/auth.service';
import { APP_TRANSLATION_SERVICE } from '@/core/translation.service';

import { MgnpMenu, MgnpMenuItem } from '@mgremy/ng-primitives/menu';
import { NgpMenu, NgpMenuItem, NgpMenuTrigger } from 'ng-primitives/menu';

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

@Component({
  selector: 'app-root',
  imports: [
    AppNavbar,
    AppNavbarContent,
    AppNavbarItem,
    MgnpMenu,
    MgnpMenuItem,
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
