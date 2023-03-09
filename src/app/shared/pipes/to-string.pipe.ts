import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'to_string',
  standalone: true
})
export class ToStringPipe implements PipeTransform {

  transform(value: any): any {
    return value.toString();
  }

}
