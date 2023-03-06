// tslint:disable: no-null-keyword
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import {
  ALPHANUMERIC_REGEX,
  ONLY_LETTER_REGEX,
  ONLY_NUMBER_CUSTOM_REGEX,
  ONLY_NUMBER_REGEX,
  PHONE_REGEX,
} from './regex';

import { toString } from './to';

export function equalsLength(v: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: any } | null => {
    const value: string = toString(c.value) || '';
    const isValid: boolean = value.length === v;

    return !isValid ? { equalsLength: { currentLength: toString(value).length, requiredLength: v } } : null;
  };
}

export function betweenValues(minV: number, maxV: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: any } | null => {
    const value: number = c.value || 0;
    const isValid: boolean = +value >= +minV && +value <= +maxV;

    return !isValid ? { betweenValues: { currentValue: value, requiredMinValue: minV, requiredMaxValue: maxV } } : null;
  };
}

export function betweenLength(minV: number, maxV: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: any } | null => {
    const value: string = toString(c.value) || '';
    const isValid: boolean = value.length >= minV && value.length <= maxV;

    return !isValid
      ? { betweenLength: { currentLength: value.length, requiredMinLength: minV, requiredMaxLength: maxV } }
      : null;
  };
}

export function day(): ValidatorFn {
  const minV: number = 1;
  const maxV: number = 31;

  return (c: AbstractControl): { [key: string]: any } | null => {
    const value: number = parseInt(c.value, 10) || 0;
    const isValid: boolean = !!(value >= minV && value <= maxV && value);

    return !isValid ? { isInvalidDay: true } : null;
  };
}

export function month(): ValidatorFn {
  const minV: number = 1;
  const maxV: number = 12;

  return (c: AbstractControl): { [key: string]: any } | null => {
    const value: number = parseInt(c.value, 10);
    const isValid: boolean = !!(value >= minV && value <= maxV && value);

    return !isValid ? { isIvalidMonth: true } : null;
  };
}

export function year(): ValidatorFn {
  const maxV: number = new Date().getFullYear() - 18;
  const minV: number = maxV - 80;

  return (c: AbstractControl): { [key: string]: any } | null => {
    const value: number = parseInt(c.value, 10) || 0;
    const isValid: boolean = !!(value >= minV && value <= maxV && value);

    return !isValid ? { isInvalidYear: true } : null;
  };
}

export function isValidDate(): ValidatorFn {
  return (c: AbstractControl): { [key: string]: any } | null => {
    const date: string[] | string = toString(c.value).split('-') || '';
    const monthLength: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (+date[0] % 4 === 0 || (+date[0] % 400 === 0 && +date[0] % 100 !== 0)) {
      monthLength[1] = 29;
    }

    return !(+date[2] <= monthLength[+date[1] - 1]) ? { isInvalidDate: true } : null;
  };
}

export function isInvalidCard(): ValidatorFn {
  return (c: AbstractControl): { [key: string]: any } | null => {
    const text: string = toString(c.value).replace(/\D/g, '');
    const isValidCard: boolean =
      /^3[47]\d{0,13}$/.test(text) ||
      /^36\d{0,13}$/.test(text) ||
      /^4\d{0,15}$/.test(text) ||
      /^5[1-5]\d{0,15}$/.test(text);

    return !isValidCard ? { isInvalidCard: true } : null;
  };
}

export function isExperationDateOut(): ValidatorFn {
  return (c: AbstractControl): { [key: string]: any } | null => {
    const [monthEntered, yearEntered] = toString(c.value)
      .split('/')
      .filter((item) => item !== '')
      .map((item) => +item);
    const currentMonth: number = new Date().getUTCMonth() + 1;
    const currentYear: number = new Date().getFullYear() % 100;

    const isInvalidExpirationCard: boolean =
      (monthEntered < currentMonth && yearEntered <= currentYear) ||
      !(monthEntered <= 12 && monthEntered >= 1) ||
      !(yearEntered >= currentYear && yearEntered <= currentYear + 20);

    return isInvalidExpirationCard ? { isExperationDateOut: true } : null;
  };
}

export function matchValidator(matchTo: string, reverse?: boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.parent && reverse) {
      const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
      if (c) {
        c.updateValueAndValidity();
      }
      return null;
    }
    return !!control.parent &&
      !!control.parent.value &&
      control.value === (control.parent?.controls as any)[matchTo].value
      ? null
      : { matching: true };
  };
}

export function rangeDate(fromControlName: string, toControlName: string): ValidatorFn | ValidationErrors {
  return (formGroup: FormGroup): { [key: string]: any } | null => {
    const fromControl: AbstractControl | null = formGroup.get(fromControlName);
    const toControl: AbstractControl | null = formGroup.get(toControlName);

    if (!fromControl?.value && !toControl?.value) {
      return null;
    }

    return !fromControl?.value || !toControl?.value || fromControl.value > toControl.value
      ? { invalidRange: true }
      : null;
  };
}

export function onlyNumber(): any {
  return (control: FormControl): ValidationErrors | null => {
    return !control.value || ONLY_NUMBER_REGEX.test(control.value) ? null : { onlyNumber: true };
  };
}
export function phoneFormat(): any {
  return (control: FormControl): ValidationErrors | null => {
    return !control.value || PHONE_REGEX.test(control.value) ? null : { phoneFormat: true };
  };
}
export function onlyNumberCustom(): any {
  return (control: FormControl): ValidationErrors | null => {
    return !control.value || ONLY_NUMBER_CUSTOM_REGEX.test(control.value) ? null : { onlyNumber: true };
  };
}
export function onlyLetter(): any {
  return (control: FormControl): ValidationErrors | null => {
    return !control.value || ONLY_LETTER_REGEX.test(control.value) ? null : { onlyLetter: true };
  };
}

export function alphanumeric(): any {
  return (control: FormControl): ValidationErrors | null => {
    return !control.value || ALPHANUMERIC_REGEX.test(control.value) ? null : { alphanumeric: true };
  };
}

function _getOldValidators(validator?: ValidatorFn | ValidatorFn[] | null): ValidatorFn[] {
  if (!validator) {
    return [];
  }

  if (Array.isArray(validator)) {
    return validator;
  }

  return [validator];
}

export function documentNumberByDocumentType(
  documentType: string,
  validator?: ValidatorFn | ValidatorFn[] | null,
): ValidatorFn[] {
  const newValidators: ValidatorFn[] = [];
  const oldValidators: ValidatorFn[] = _getOldValidators(validator);

  switch (documentType) {
    case 'DNI':
      newValidators.push(onlyNumber(), Validators.minLength(8), Validators.maxLength(8));
      break;
    case 'RUC':
      newValidators.push(onlyNumber(), Validators.minLength(11), Validators.maxLength(11));
      break;
    case 'PEX':
      newValidators.push(alphanumeric(), Validators.minLength(13), Validators.maxLength(13));
      break;
    case 'CEX':
      newValidators.push(onlyNumber(), Validators.minLength(8), Validators.maxLength(13));
      break;
    default:
      break;
  }

  return [...oldValidators, ...newValidators];
}
