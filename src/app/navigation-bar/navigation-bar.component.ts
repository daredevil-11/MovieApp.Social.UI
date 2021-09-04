import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticationPopupComponent } from '../authentication-popup/authentication-popup.component';
import { AuthenticationMode } from '../constants/enums';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
 /** constants */
 AUTH_MODE = AuthenticationMode;

 /** constructors */
  constructor(private _bottomSheetService: MatBottomSheet) { }

  /** component life-cycle hooks */
  ngOnInit(): void {
  }

  /** public methods */
  onAuthenticationClick(authMode: AuthenticationMode) {
    this._bottomSheetService.open(AuthenticationPopupComponent, {
      data: { authMode: authMode },
    });
  }
}
