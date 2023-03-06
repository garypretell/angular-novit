import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { userResolver } from '@core/resolver/user.resolver';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'list',
        component: UserListComponent,
        data: {
          mustBeStored: true,
        },
      },
      { path: 'create', component: UserCreateComponent },
      {
        path: 'detail/:id',
        component: UserDetailComponent,
        data: {
          mustBeStored: true,
        },
        resolve: { userData: userResolver },
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: '**', redirectTo: 'error/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class UserRoutingModule {}
