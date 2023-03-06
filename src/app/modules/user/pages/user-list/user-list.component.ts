import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PATH_URL_DATA } from '@core/constants/routes';
import { User } from '@core/interfaces/user';
import { AuthService } from '@core/services/auth.service';
import { ignoreElements, catchError, of, combineLatest, debounceTime, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  searchControl = new FormControl('');
  authService = inject(AuthService);
  router = inject(Router);
  userList$ = this.authService.userList();
  userListError$ = this.userList$.pipe(
    ignoreElements(),
    catchError((err) => of(err))
  );

  filteredUsers$: Observable<User[]> = combineLatest([
    this.userList$,
    this.searchControl.valueChanges.pipe<any, string>(
      debounceTime(300),
      startWith('')
    ),
  ]).pipe(
    map(([users, filter]) => {
      if (!filter) {
        return users;
      }

      return users.filter(({ id, displayName, email }) => {
        return [id, displayName, email]
          .join('¶')
          .toLowerCase()
          .includes(filter.toLowerCase());
      });
    })
  );

  getDetail(user: any) {
    this.router.navigate([`${PATH_URL_DATA.urlUserDetail}/${user.id}`]);
  }
}
