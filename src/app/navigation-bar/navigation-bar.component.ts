import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticationPopupComponent } from '../account/authentication-popup/authentication-popup.component';
import { AuthenticationMode } from '../constants/enums';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from '@abp/ng.core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
 /** constants */
 AUTH_MODE = AuthenticationMode;

 /** constructors */
  constructor(
    private _bottomSheetService: MatBottomSheet, 
    private oAuthService: OAuthService, 
    private authService: AuthService) { }

  /** component life-cycle hooks */
  ngOnInit(): void {
  }

  /** public methods */
  onAuthenticationClick(authMode: AuthenticationMode) {
    this._bottomSheetService.open(AuthenticationPopupComponent, {
      data: { authMode: authMode },
    });
  }

  get isUserLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  onLogout() {
    this.authService.logout();
  }
}
