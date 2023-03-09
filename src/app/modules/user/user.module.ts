import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SignUpComponent } from '@modules/auth/pages/sign-up/sign-up.component';
import { TabBarModule } from '@modules/tab-bar';
import { FilterChipListComponent } from '@shared/components/filter-chip-list/filter-chip-list.component';
import { ManagementObservableComponent } from '@shared/components/management-observable/management-observable.component';
import { MessageErrorComponent } from '@shared/components/message-error/message-error.component';
import { CustomRouterReuseStrategy } from 'src/app/custom-router-reuse.strategy';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
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
    SignUpComponent,
    TabBarModule,
    MatDialogModule,
    MatButtonModule,
    MatPaginatorModule,
    FilterChipListComponent,
    MessageErrorComponent
  ],
  providers: [
    CustomRouterReuseStrategy
  ]
})
export class UserModule { }
