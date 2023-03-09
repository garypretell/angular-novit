import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import NotFoundComponent from '@modules/not-found/not-found.component';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: 'home',
    component: LayoutComponent,
    loadChildren: () => import('../home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'user',
    component: LayoutComponent,
    loadChildren: () => import('../user/user.module').then((m) => m.UserModule)
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
