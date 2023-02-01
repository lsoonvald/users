import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './containers/user-list/user-list.component';
import { UserDetailComponent } from './containers/user-detail/user-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [UserListComponent, UserDetailComponent],
  imports: [SharedModule, CommonModule, UserRoutingModule],
})
export class UserModule {}
