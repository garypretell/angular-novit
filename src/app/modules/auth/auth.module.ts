import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { EmailVerifiedComponent } from './pages/email-verified/email-verified.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { TwoStepsComponent } from './pages/two-steps/two-steps.component';
import { MessageErrorComponent } from '@shared/components/message-error/message-error.component';
import { PasswordStrengthBarComponent } from '@shared/components/password-strength-bar/password-strength-bar.component';

@NgModule({
  declarations: [
    AuthComponent,
    SignInComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
    TwoStepsComponent,
    EmailVerifiedComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MessageErrorComponent,
    PasswordStrengthBarComponent

  ],
})
export class AuthModule {}
