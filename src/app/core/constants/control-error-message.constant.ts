export const FN_CONTROL_ERROR_MESSAGE: any = {
  // Generals
  min: (error: { min: number; actual: number }) => `El valor mínimo es ${error.min}`,
  max: (error: { max: number; actual: number }) => `El valor máximo es ${error.max}`,
  required: () => 'El campo es requerido',
  email: () => 'Ingrese un correo electrónico válido',
  minlength: (error: { requiredLength: number; actualLength: number }) =>
    `El campo ingresado debe tener al menos ${error.requiredLength} caracteres`,
  maxlength: (error: { requiredLength: number; actualLength: number }) =>
    `El campo ingresado debe tener como máximo ${error.requiredLength} caracteres`,
  pattern: () => 'No cumple con el formato solicitado',
  // Custom
  onlyNumber: () => 'Solo es permitido números',
  phoneFormat: () => 'Solo es permitido teléfono celular',
  onlyLetter: () => 'Solo es permitido letras',
  alphanumeric: () => 'Solo es permitido alfanumérico',
  passwordPolicy: () => 'La contraseña no cumple con las políticas establecidas',
  confirmPassword: () => 'Las contraseñas no coincide',
  phoneNumber: () => 'Sólo puede ingresar números y guiones',
  betweenLength: (error: { currentLength: number; requiredMinLength: number; requiredMaxLength: number }) =>
    `El campo ingresado debe contener entre ${error.requiredMinLength} y  ${error.requiredMaxLength} caracteres`,
  equalsLength: (error: { currentLength: number; requiredLength: number }) =>
    `El campo ingresado debe contener ${error.requiredLength} caracteres`,
  matching: () => 'Las contraseñas no coinciden',
};
