/**
 * Every time a step changes or the user clicks 'Save' this gets called.
 * If a component doesn't implement this the result 'true' is assumed.
 */
export interface DialogWithValidation {
  isValid(): boolean;
}

