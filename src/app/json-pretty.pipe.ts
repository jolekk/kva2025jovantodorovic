import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonPretty',
  standalone: true // Mark as standalone
})
export class JsonPrettyPipe implements PipeTransform {
  transform(value: any): string {
    return JSON.stringify(value, null, 2);
  }
}
