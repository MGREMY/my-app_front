import { Directive } from '@angular/core';

@Directive({
  selector: '[appNavbar], nav[appNavbar]',
  standalone: true,
  providers: [],
  hostDirectives: [],
  exportAs: 'appNavbar',
})
export class AppNavbar {}
