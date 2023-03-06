export function isDef(v: any): boolean {
  return v !== undefined && v !== null;
}

export function isUndefined(v: any): boolean {
  return typeof v === 'undefined';
}

export function hasNotValidValue(v: any): boolean {
  // tslint:disable-next-line: no-null-keyword
  return [undefined, null, NaN, ''].includes(v);
}

export function isBoolean(v: any): boolean {
  // can be with typeof, but i'll improve later
  return v === true || v === false;
}

export function isBooly(v: any): boolean {
  return v === true || v === false || (v || '').toLowerCase() === 'true' || (v || '').toLowerCase() === 'false';
}

export function isBoolNumber(v: any): boolean {
  return +v === 1 || +v === 0;
}

export function isFunction(v: any): boolean {
  return v instanceof Function;
}

export function isArray(v: any): boolean {
  return Array.isArray(v);
}

export function isArrayNotEmpty(v: any[]): boolean {
  return Array.isArray(v) && !!v.length;
}
