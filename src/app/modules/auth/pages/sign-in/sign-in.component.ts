import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, mergeMap, of } from 'rxjs';
import { PATH_URL_DATA } from 'src/app/core/constants/routes';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  credentials: FormGroup;
  show: boolean = false;
  spinner: boolean = false;
  errorMessage: any;
  constructor(private fb: FormBuilder, private router: Router, public authService: AuthService) {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  password(): void {
    this.show = !this.show;
  }

  login() {
    this.errorMessage = null;
    this.spinner = true;
    this.authService
      .signIn(this.credentials.value)
      .pipe(
        mergeMap((user: any) => {
          localStorage.setItem('token', user.body?.access_token);
          return forkJoin([of(user), this.authService.myUser(user.body.user.id)]);
        }),
      )
      .subscribe({
        next: (result: any) => {
          const authenticated = result[0].body.user.role === 'authenticated' ? true : false;
          const token: any = result[0].body?.access_token;
          const usuario = result[1].body[0];
          this.setValues(authenticated, token, usuario);
          this.spinner = false;
        },
        error: (error: any) => {
          this.spinner = false;
          this.errorMessage = error.error_description;
        },
      });
  }

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate([PATH_URL_DATA.urlHome]);
    } else {
      this.router.navigate([PATH_URL_DATA.urlVerify]);
    }
  }

  private setValues(authenticated: any, token: any, usuario: any) {
    this.authService.user$ = of(usuario);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(usuario));
    this.redirectUser(authenticated);
  }
}
