import { Injectable, signal } from '@angular/core';
import {
  CognitoIdentityProviderClient
} from '@aws-sdk/client-cognito-identity-provider';
import { AuthTokens } from '../models/auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly client = new CognitoIdentityProviderClient({
    region: 'eu-north-1',
    maxAttempts: 3
  });

  private readonly _tokens = signal<AuthTokens | null>(null);

  get instance(): CognitoIdentityProviderClient {
    return this.client;
  }

  get accessToken(): string | null {
    return this._tokens()?.accessToken
      ?? localStorage.getItem('access_token');
  }

  setTokens(tokens: AuthTokens): void {
    this._tokens.set(tokens);

    // optional persistence
    localStorage.setItem('access_token', tokens.accessToken);
    localStorage.setItem('id_token', tokens.idToken);
    localStorage.setItem('refresh_token', tokens.refreshToken);
  }

  clear(): void {
    this._tokens.set(null);
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  
}