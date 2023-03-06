export type primitiveValue = boolean | number | string;
export type NumberOrString = number | string;
export type Mask = (string | RegExp)[] | ((raw: string) => (string | RegExp)[]) | false;
