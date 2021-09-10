import { ABP, ConfigStateService } from '@abp/ng.core';
import { Injector } from '@angular/core';
import {
  ValidationErrors,
  ValidatorFn,
  AbstractControl,
  Validators,
} from '@angular/forms';

const { minLength, maxLength } = Validators;

export function getPasswordValidators(injector: Injector): ValidatorFn[] {
  const getRule = getRuleFn(injector);

  const passwordRulesArr = [] as ValidatorFn[];
  let requiredLength = 1;

  if (getRule('RequireDigit') === 'true') {
    passwordRulesArr.push(
      CustomValidators.patternValidator(/\d/, {
        hasNumber: true,
      })
    );
  }

  if (getRule('RequireLowercase') === 'true') {
    passwordRulesArr.push(
      CustomValidators.patternValidator(/[a-z]/, {
        hasSmallCase: true,
      })
    );
  }

  if (getRule('RequireUppercase') === 'true') {
    passwordRulesArr.push(
      CustomValidators.patternValidator(/[A-Z]/, {
        hasCapitalCase: true,
      })
    );
  }

  if (getRule('RequireNonAlphanumeric') === 'true') {
    passwordRulesArr.push(
      CustomValidators.patternValidator(
        /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        {
          hasSpecialCharacters: true,
        }
      )
    );
  }

  if (Number.isInteger(+getRule('RequiredLength'))) {
    requiredLength = +getRule('RequiredLength');
  }

  return [...passwordRulesArr, minLength(requiredLength), maxLength(128)];
}

function getRuleFn(injector: Injector) {
  const configState = injector.get(ConfigStateService);

  return (key: string) => {
    const passwordRules: ABP.Dictionary<string> =
      configState.getSettings('Identity.Password');

    return (passwordRules[`Abp.Identity.Password.${key}`] || '').toLowerCase();
  };
}

export class CustomValidators {
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return {};
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? {} : error;
    };
  }

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password')!.value; // get password from our password form control
    const confirmPassword: string = control.get('confirmPassword')!.value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('confirmPassword')!.setErrors({ NoPassswordMatch: true });
    }
  }
}
