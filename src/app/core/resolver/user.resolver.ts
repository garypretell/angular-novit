import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { PATH_URL_DATA } from '@core/constants/routes';
import { User } from '@core/interfaces/user';
import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';
import { map, catchError, of } from 'rxjs';

export const userResolver: ResolveFn<boolean> = (route, state) => {
  // const authService = inject(AuthService);
  const userService = inject(UserService);
  const router = inject(Router);
  const id = route.params['id'];

  return userService.getUserbyId({userId: id}).pipe(
    map((data: User[]) => {
      return data[0];
    }),
    catchError((error) => {
      router.navigate([PATH_URL_DATA.urlUserList], { replaceUrl: true });
      return of(error);
    })
  );
  // return authService.userById(id).pipe(
  //   map((data) => {
  //     return data[0];
  //   }),
  //   catchError((error) => {
  //     router.navigate([PATH_URL_DATA.urlUserList], { replaceUrl: true });
  //     return of(error);
  //   })
  // );
};
