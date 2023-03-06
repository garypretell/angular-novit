import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { ManagementObservableComponent } from '@shared/components/management-observable/management-observable.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { TabBarModule } from '@modules/tab-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomRouterReuseStrategy } from 'src/app/custom-router-reuse.strategy';


@NgModule({
  declarations: [
    UserComponent,
    UserListComponent,
    UserCreateComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    ManagementObservableComponent,
    TabBarModule,
  ],
  providers: [
    CustomRouterReuseStrategy
  ]
})
export class UserModule { }
