import { Component, Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: '363481054949-kfshu8rkke2niqr7d27sp70k4at85ld3.apps.googleusercontent.com',
  scope: 'openid profile email'
}

@Injectable({
  providedIn: 'root'
})

export class GoogleApiService {

  constructor(private readonly oAuthService: OAuthService) { 
    oAuthService.configure(oAuthConfig)
    oAuthService.loadDiscoveryDocument().then( () => {
      oAuthService.tryLoginImplicitFlow().then( () => {
        if(oAuthService.hasValidAccessToken()){
          oAuthService.initLoginFlow()
        }
        else{
          oAuthService.loadUserProfile().then( (userProfile: any) => {
            console.log(JSON.stringify(userProfile))
          })
        }
      })
    })
  }
}
