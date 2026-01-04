import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  Validators,
  FormControl,
  ReactiveFormsModule,
  FormGroup
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SignUpCommand } from '@aws-sdk/client-cognito-identity-provider';

type Gender = 'male' | 'female' | 'other';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class SignupComponent {

  private readonly router = inject(Router);
  private readonly cognito = inject(AuthService).instance;

  
  readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)]
    }),

    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),

    phone: new FormControl<string | null>(null, {
      validators: [Validators.pattern(/^[0-9]{10}$/)]
    }),

    gender: new FormControl<Gender | null>(null, {
      validators: [Validators.required]
    }),

    dateOfBirth: new FormControl<string | null>(null, {
      validators: [Validators.required]
    }),

    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)]
    }),

    confirmPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)]
    })
  });

  /** Signal for submit state (enterprise-friendly) */
  readonly submitting = signal(false);

  async submit(): Promise<void> {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  this.submitting.set(true);

  const {
    name,
    email,
    phone,
    gender,
    dateOfBirth,
    password
  } = this.form.getRawValue();

  try {
    await this.cognito.send(
      new SignUpCommand({
        ClientId: '7o70kqbrb50qa52o391uhrslop',
        Username: email,
        Password: password,
        UserAttributes: [
          { Name: 'name', Value: name },
          { Name: 'email', Value: email },

          ...(phone
            ? [{ Name: 'phone_number', Value: `+91${phone}` }]
            : []),

          ...(gender
            ? [{ Name: 'gender', Value: String(gender) }]
            : []),

          ...(dateOfBirth
            ? [{ Name: 'birthdate', Value: dateOfBirth }]
            : [])
        ]
      })
    );

    this.onSignupSuccess(email);

  } catch (error: unknown) {
    this.handleSignupError(error);
  } finally {
    this.submitting.set(false);
  }

  this.router.navigate(['/login']);
}


  onSignupSuccess(email: string) {

  }

  handleSignupError(error: any) {

  }
}
