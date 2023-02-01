import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './containers/user-detail/user-detail.component';
import { UserListComponent } from './containers/user-list/user-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: UserListComponent
  },
  {
    path: 'detail/:id',
    component: UserDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
