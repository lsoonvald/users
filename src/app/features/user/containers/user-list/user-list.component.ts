import { Component, ViewEncapsulation } from '@angular/core';
import { UserFacadeService } from '../../services/user-facade.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserListComponent {
  users = this.facade.users;
  searchForm = this.facade.searchForm;

  constructor(private facade: UserFacadeService) {
    this.facade.getUserList();
    this.facade.createSearchForm();
  }

  deleteUser(id: number): void {
    this.facade.deleteUser(id);
  }
}
