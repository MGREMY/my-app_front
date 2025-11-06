import { AuthService } from '@app-core/api/auth/auth.service';
import { APP_TRANSLATION_SERVICE } from '@app-core/translation.service';

import { Button } from 'flowbite-angular/button';
import { Dropdown, DropdownContent, DropdownItem } from 'flowbite-angular/dropdown';
import { Icon } from 'flowbite-angular/icon';
import { bars } from 'flowbite-angular/icon/outline/general';
import { userCircle } from 'flowbite-angular/icon/outline/user';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarToggle,
} from 'flowbite-angular/navbar';
import { Theme, ThemeToggle } from 'flowbite-angular/theme-toggle';
import { provideIcons } from '@ng-icons/core';
import { flagCp, flagUs } from '@ng-icons/flag-icons';
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
    RouterOutlet,
    RouterLink,
    TranslatePipe,
    Navbar,
    NavbarBrand,
    NavbarToggle,
    NavbarContent,
    NavbarItem,
    Icon,
    ThemeToggle,
    NgpMenuTrigger,
    Button,
    Dropdown,
    DropdownContent,
    DropdownItem,
    TitleCasePipe,
  ],
  templateUrl: './app.component.html',
  providers: [provideIcons({ bars, flagCp, flagUs, userCircle })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  hostDirectives: [Theme],
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
