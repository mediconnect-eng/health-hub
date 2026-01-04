import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthFlowType, InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
 private readonly router = inject(Router);
 private readonly auth = inject(AuthService);

  /** UI State */
  readonly submitting = signal(false);

  /** Reactive Form */
  readonly form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),

    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)]
    })
  });

  // login(): void {
  //   if (this.form.invalid) {
  //     this.form.markAllAsTouched();
  //     return;
  //   }

  //   this.submitting.set(true);

  //   // 🔐 AuthService.login(this.form.getRawValue()) → future integration

  //   this.router.navigate(['/dashboard/patient']);
  // }

  async login(): Promise<void> {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const { email, password } = this.form.getRawValue();

  try {
    const response = await this.auth.instance.send(
      new InitiateAuthCommand({
        AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
        ClientId: '7o70kqbrb50qa52o391uhrslop',
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password
        }
      })
    );

    const result = response.AuthenticationResult;

    if (!result) {
      throw new Error('Authentication failed');
    }

    console.log("RESPONSE",result,response);

    this.auth.setTokens({
      accessToken: result.AccessToken!,
      idToken: result.IdToken!,
      refreshToken: result.RefreshToken!
    });

  } catch (error: any) {
    if (error.name === 'UserNotConfirmedException') {
      this.router.navigate(['/confirm-signup'], {
        queryParams: { email }
      });
      return;
    }

    console.log("ERROR",error);
  }

  this.router.navigate(['/dashboard/patient']);
}
}
