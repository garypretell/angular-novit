import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageErrorComponent } from '@shared/components/message-error/message-error.component';
import { PasswordStrengthBarComponent } from '@shared/components/password-strength-bar/password-strength-bar.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PATH_URL_DATA } from 'src/app/core/constants/routes';
import { AuthService } from 'src/app/core/services/auth.service';
import { matchValidator } from 'src/app/shared/validators/frm-validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MessageErrorComponent,
    PasswordStrengthBarComponent, AngularSvgIconModule]
})
export class SignUpComponent {
  form: FormGroup;
  show: boolean = false;
  spinner: boolean = false;
  errorMessage: any;
  checkStrongPassword: boolean = true;
  constructor(private fb: FormBuilder, public router: Router, public auth: AuthService) {
    this.form = this.fb.group({
      displayName: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, matchValidator('confirmPassword', true)]],
      confirmPassword: ['', [Validators.required, matchValidator('password')]],
      check: ['', [Validators.requiredTrue]],
    });
  }

  password(): void {
    this.show = !this.show;
  }

  postSignIn(): void {
    this.router.navigate([PATH_URL_DATA.urlHome]);
  }

  async signUp() {
    this.errorMessage = null;
    this.spinner = true;
    try {
      const user = await this.auth.signUp(this.form.value);
      if (user) {
        this.spinner = false;
        const isVerified = this.auth.isEmailVerified(user);
        this.redirectUser(isVerified);
      }
    } catch (error: any) {
      console.log('Error', error);
      this.spinner = false;
      this.errorMessage = error.error.error_description;
    }
  }

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.postSignIn();
    } else {
      this.router.navigate([PATH_URL_DATA.urlVerify]);
    }
  }

  passwordStrong(event: any): void {
    this.checkStrongPassword = event >= 3 ? true : false;
  }
}
