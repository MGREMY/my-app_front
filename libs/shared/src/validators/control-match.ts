import { AbstractControl, ValidationErrors } from '@angular/forms';

export function controlMatchValidator(...controls: string[]) {
  return (group: AbstractControl): ValidationErrors | null => {
    const values = controls.map((control) => group.get(control)?.value);

    return values.every((value) => value === values[0]) ? null : { controlDoNotMatch: controls };
  };
}
