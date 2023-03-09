import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { PATH_URL_DATA } from '@core/constants/routes';
import { IFilter } from '@core/interfaces/filter.interface';
import { User } from '@core/interfaces/user';
import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';
import { BaseFormUserSearch } from '@core/utils/base-form-user-search';
import {
  catchError,
  combineLatest,
  debounceTime,
  ignoreElements,
  map,
  Observable,
  of,
  startWith,
} from 'rxjs';
import { UserCreateComponent } from '../user-create/user-create.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  filtros: IFilter[] = [];
  filtroData = {};
  length = 10;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = true;
  showPageSizeOptions = false;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  searchUserForm = inject(BaseFormUserSearch);
  searchControl = new FormControl('');
  authService = inject(AuthService);
  userService = inject(UserService);
  router = inject(Router);
  dialog = inject(MatDialog);

  userList$!: Observable<any>;
  userListError$!: Observable<any>;
  // userList$ = this.authService.userList();
  // userList$ = this.userService.getUsers();
  // userListError$ = this.userList$.pipe(
  //   ignoreElements(),
  //   catchError((err) => of(err))
  // );

  getDetail(user: any) {
    this.router.navigate([`${PATH_URL_DATA.urlUserDetail}/${user.id}`]);
  }

  openDialog() {
    const user = {};
    let dialogRef = this.dialog.open(UserCreateComponent, {
      width: '480px',
      data: { user }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.userService.addUser(result.user).subscribe({
          next: () => {
            this.searchControl.reset();
            this.initData();
          },
        });
      }
    });
  }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.userService
      .getUsersPagination(
        { from: 0, to: this.pageSize - 1 },
        this.filtroData
      )
      .subscribe((data) => {
        this.length = data.headers.get('content-range').split('/')[1];
        this.userList$ = of(data.body);
        this.userListError$ = this.userList$.pipe(
          ignoreElements(),
          catchError((err) => of(err))
        );
      });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    const from = this.pageIndex * this.pageSize;
    const to = (this.pageIndex + 1) * this.pageSize - 1;
    this.userService
      .getUsersPagination(
        { from, to },
        this.filtroData
      )
      .subscribe((data) => {
        this.length = +data.headers.get('content-range').split('/')[1];
        this.userList$ = of(data.body);
      });
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }

  filtrar() {
    this.filtros = [];
    const filtros: any = structuredClone(this.searchUserForm.baseForm.value);
    Object.keys(filtros).forEach((key) => {
      if (filtros[key] == null || filtros[key] === '') {
        delete filtros[key];
      } else {
        this.filtros.push({
          id: key,
          name: (this.searchUserForm.baseForm.value as any)[key],
        });
        filtros[key] =
          typeof filtros[key] === 'string'
            ? `like.${filtros[key]}%`
            : `eq.${filtros[key]}`;
      }
    });
    this.filtroData = filtros;
    this.userService
      .getUsersPagination({ from: 0, to: this.pageSize - 1 }, filtros)
      .subscribe((data) => {
        this.length = data.headers.get('content-range').split('/')[1];
        this.userList$ = of(data.body);
        this.pageIndex = 0;
      });
  }

  remove(filtro: any): void {
    this.searchUserForm.baseForm.get(filtro.id)?.setValue('');
    this.filtrar();
  }
}
