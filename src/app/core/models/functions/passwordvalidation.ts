import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;

  if (!value) {
    return { required: true };
  }

  if (!value.trim()) {
    return { whitespace: true };
  }

  const strongPasswordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!strongPasswordPattern.test(value)) {
    return { weakPassword: true };
  }

  return null;
}
