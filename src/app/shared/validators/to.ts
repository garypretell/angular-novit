import { NumberOrString } from './types';

export function toString(v: NumberOrString): string {
  return `${v}`.trim();
}

export function toFixedUp(num: NumberOrString = 0, digitos: number = 2): string {
  const validatedNum: number = num === null ? 0 : +num;

  return validatedNum.toFixed(digitos);
}

export function toFixedDown(num: NumberOrString = 0, digitos: number = 2): string {
  const validatedNum: number = num === null ? 0 : +num;
  const decimals: number = Math.pow(10, digitos);
  const result: number = Math.floor(+validatedNum * decimals) / decimals;

  return Number.isInteger(result) && result !== 0 ? `${result}.00` : `${result}`;
}
