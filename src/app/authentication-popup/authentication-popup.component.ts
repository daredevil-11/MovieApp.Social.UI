import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { AuthenticationMode, AuthenticationType } from '../constants/enums';

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
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { authMode: AuthenticationMode }) { }

  /** component life-cycle hooks */
  ngOnInit(): void {
  }

  /** public methods */
  onAuthClick(event: MouseEvent, authType: AuthenticationType): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();

    
  }
}
