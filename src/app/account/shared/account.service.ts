import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterDto, IdentityUserDto, LoginDto, LoginResponseDto } from '../shared/account.models';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private rest: RestService) {}

  register(body: RegisterDto): Observable<IdentityUserDto> {
    return this.rest.request<RegisterDto, IdentityUserDto>(
      {
        method: 'POST',
        url: `/api/account/register`,
        body
      },
      { skipHandleError: true }
    );
  }

  login(body: LoginDto): Observable<LoginResponseDto> {
    return this.rest.request<LoginDto, LoginResponseDto>(
      {
        method: 'POST',
        url: `/api/account/login`,
        body
      },
      { skipHandleError: true }
    );
  }
}