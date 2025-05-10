import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function checkSamePass():ValidatorFn{
    return (control:AbstractControl):ValidationErrors|null => {
      const rePass = control?.parent?.get('rePassword')?.value;
      const pass = control?.value ;
      return pass&&rePass  && pass !== rePass ? {'repeatedPass':true}:null
    }
}