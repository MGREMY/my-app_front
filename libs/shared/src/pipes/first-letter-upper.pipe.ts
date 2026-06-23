import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterUpper',
  pure: false,
})
export class FirstLetterUpperPipe implements PipeTransform {
  transform(value: string): string {
    const firstLetter = value.at(0);
    const remaning = value.substring(1, value.length);

    return `${firstLetter?.toUpperCase()}${remaning}`;
  }
}
