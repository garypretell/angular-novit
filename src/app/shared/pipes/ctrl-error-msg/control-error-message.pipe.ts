import { Pipe, PipeTransform } from '@angular/core';
import { FN_CONTROL_ERROR_MESSAGE } from '@core/constants/control-error-message.constant';

@Pipe({
  name: 'controlErrorMessage',
})
export class ControlErrorMessagePipe implements PipeTransform {
  transform(value: any): string {
    if (!value) {
      return '';
    }

    const key: string = Object.keys(value)[0];
    const fnErrorMessage: any = FN_CONTROL_ERROR_MESSAGE[key];

    return fnErrorMessage(value[key]) || '';
  }
}
