import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighlightPipe implements PipeTransform {

  transform(text: string, search: string[]): string {
    if (!search || !text) {
      return text;
    }

    search.forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      text = text.replace(regex, `<span class="badge">${term}</span>`);
    });

    return text;
  }
}
