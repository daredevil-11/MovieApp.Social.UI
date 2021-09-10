import { AuthService, LocalizationService, LoginParams } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { LoginDto } from '../shared/account.models';
import { AccountService } from '../shared/account.service';

const { maxLength, required } = Validators;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /* component specific properties */
  form!: FormGroup;
  inProgress: boolean = false;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private toasterService: MatSnackBar,
    private router: Router,
    private localizationService: LocalizationService,
    private store: Store
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [required, maxLength(255)]],
      password: ['', [required, maxLength(128)]],
      rememberMe: [false],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.inProgress = true;

    const cred = {
      userNameOrEmailAddress: this.form.get('username')!.value,
      password: this.form.get('password')!.value,
      rememberMe: this.form.get('rememberMe')!.value,
    } as LoginDto;

    this.accountService
      .login(cred)
      .pipe(
        switchMap(() => {        
          return this.router.navigate(['']);
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
