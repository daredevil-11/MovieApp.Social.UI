import { ConfigState, LocalizationService } from '@abp/ng.core';
import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { throwError } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { AccountService } from '../shared/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterDto } from '../shared/account.models';
import { getPasswordValidators } from '../shared/account.validation-utils';
import { Router } from '@angular/router';
const { maxLength, required, email } = Validators;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

  /* component specific properties */
  form!: FormGroup;
  inProgress: boolean = false;
  isSelfRegistrationEnabled = true;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private store: Store,
    private toasterService: MatSnackBar,
    private router: Router,
    private injector: Injector,
    private localizationService: LocalizationService
  ) { }

  ngOnInit() {
    this.isSelfRegistrationEnabled =
      (
        (this.store.selectSnapshot(
          ConfigState.getSetting('Abp.Account.IsSelfRegistrationEnabled')
        ) as string) || ''
      ).toLowerCase() !== 'false';

    if (!this.isSelfRegistrationEnabled) {
      this.toasterService.open(
          'Self registration is disabled', //'AbpAccount::SelfRegistrationDisabledMessage',
          '',
          { duration: 10000}
      );
      return;
    }

    this.form = this.fb.group({
      username: ['', [required, maxLength(255)]],
      password: ['', [required, ...getPasswordValidators(this.injector)]],
      email: ['', [required, email]],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.inProgress = true;

    const newUser = {
      userName: this.form.get('username')!.value,
      password: this.form.get('password')!.value,
      emailAddress: this.form.get('email')!.value,
      appName: 'Angular',
    } as RegisterDto;

    this.accountService
      .register(newUser)
      .pipe(
        switchMap(() => {
          this.toasterService.open(
            'Registration Successful',
            '',
            { duration: 5000 }
          );          
          return this.router.navigate(['account/login']);
        }),
        catchError((err) => {
          this.toasterService.open(
            err?.error?.error_description ||
              err?.error?.error?.message ||
              this.localizationService.instant('AbpAccount::DefaultErrorMessage'),
            '',
            { duration: 7000 }
          );
          return throwError(err);
        }),
        finalize(() => (this.inProgress = false))
      )
      .subscribe();
  }

  doesFieldHaveError(field: string, err: string = 'required'): boolean {
    if(err === 'any') {
      return this.form.get(field)?.errors != null;
    }
    return this.form.get(field)?.hasError(err) ?? false;
  }
}