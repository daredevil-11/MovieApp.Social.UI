import { AuthService, LoginParams } from '@abp/ng.core';
import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { AuthenticationMode, AuthenticationType } from '../../constants/enums';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-authentication-popup',
  templateUrl: './authentication-popup.component.html',
  styleUrls: ['./authentication-popup.component.scss']
})
export class AuthenticationPopupComponent implements OnInit {

  /** constants */
  AUTH_MODE = AuthenticationMode;
  AUTH_TYPE = AuthenticationType;

  /** constructors */
  constructor(private _bottomSheetRef: MatBottomSheetRef<AuthenticationPopupComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { authMode: AuthenticationMode },
    private authService: AuthService, private oAuthService: OAuthService) { }

  /** component life-cycle hooks */
  ngOnInit(): void {
  }

  /** public methods */
  onAuthClick(event: MouseEvent, authType: AuthenticationType) {
    this._bottomSheetRef.dismiss();
    event.preventDefault();

    if(this.data.authMode === this.AUTH_MODE.Login) {
      if(authType === this.AUTH_TYPE.Email) {
        this.authService.navigateToLogin();
      } else {
        // login using google
      }
    } else {
      if(authType === this.AUTH_TYPE.Email) {
        // navigate to register page
      } else {
        // navigate to google
      }
    }
  }
}
