import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isBooleanCell',
  standalone: true
})
export class IsBooleanCellPipe implements PipeTransform {

  transform(elt: any, column: any): any {
    return column.config.values[`${elt[column.key]}`];
  }

}
