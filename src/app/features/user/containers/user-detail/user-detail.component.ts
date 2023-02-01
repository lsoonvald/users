import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserFacadeService } from '../../services/user-facade.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserDetailComponent {
  form = this.facade.userDetailForm;
  user = this.facade.user;

  constructor(
    private route: ActivatedRoute,
    private facade: UserFacadeService
  ) {
    this.facade.getUserById(this.route?.snapshot?.params['id']);
  }

  saveUser(id: number): void {
    this.facade.saveUser(id);
  }
}
