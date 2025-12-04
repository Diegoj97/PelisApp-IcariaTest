import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noSpecialCharsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }

    // Permite letras, números, espacios y signos básicos (guiones, comas, puntos, comillas simples)
    // Ajusta la regex según lo que consideres "extraño"
    const validPattern = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s:,'\.-]+$/;
    
    const isValid = validPattern.test(value);

    return isValid ? null : { hasSpecialChars: true };
  };
}
