import { FormControl } from '@angular/forms';

export function hasFormControlRequiredValidator(control: FormControl): boolean {
  if (control == null)
    return false;
  const validators = control.validator ? control.validator(new FormControl) : null;
  return validators && validators['required'] != null;
}
