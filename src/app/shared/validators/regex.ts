// tslint:disable:max-line-length
export const regex: any = {
  numerico: /^[0-9]+$/,
  alfanumerico: /^[0-9a-zA-Z]+$/,
  onlyLetterNumberGuion: /^[0-9a-zA-Z\ \/\-\_\.ñÑáéíóúÁÉÍÓÚ]+$/,
  email:
    /^([a-zA-Z0-9]+(?:[._-][a-zA-Z0-9]+)*)[._-]?@([a-zA-Z0-9]+(?:[.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}\.?)([a-zA-Z0-9]*)$/i,
};

export const ONLY_NUMBER_REGEX: RegExp = /^[0-9]+$/;
export const ONLY_NUMBER_CUSTOM_REGEX: RegExp = /^\d+(\.\d+)?$/;
export const ONLY_LETTER_REGEX: RegExp = /^[a-zA-ZñÑá-úÁ-Ú]*$/;
export const ALPHANUMERIC_REGEX: RegExp = /^[0-9a-zA-ZñÑá-úÁ-Ú]+$/;
export const PHONE_REGEX: RegExp = /9\d{8}$/;
