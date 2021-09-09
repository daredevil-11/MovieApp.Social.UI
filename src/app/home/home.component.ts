import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private oAuthService: OAuthService) { }

  ngOnInit(): void {
  }

  get isUserLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  get userName(): string {
    let claims : any = this.oAuthService.getIdentityClaims();
    return claims.preferred_username;
  }
}
