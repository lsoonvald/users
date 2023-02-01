import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, take } from 'rxjs';
import { IUser } from '../model/user';
import { UserApiService } from './user-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserFacadeService {
  private users$ = new BehaviorSubject<IUser[]>([]);
  users = this.users$.asObservable();
  private user$ = new BehaviorSubject<IUser | undefined>(undefined);
  user = this.user$.asObservable();
  userDetailForm$ = new BehaviorSubject<FormGroup | undefined>(undefined);
  userDetailForm = this.userDetailForm$.asObservable();

  constructor(private api: UserApiService, private fb: FormBuilder) {}

  getUserList(): void {
    if (!this.users$.value.length) {
      this.api
        .getUserList()
        .pipe(take(1))
        .subscribe((value) => {
          this.setUsersValue(value);
        });
    }
  }

  getUserById(id: string): void {
    this.api
      .getUserById(id)
      .pipe(take(1))
      .subscribe((value) => {
        this.setUserValue(value);
      });
  }

  setUsersValue(users: IUser[]): void {
    this.users$.next(users);
  }

  deleteUser(id: number) {
    const users = this.users$.value;
    this.users$.next(users.filter((user) => user.id !== id));
  }

  setUserValue(user: IUser): void {
    this.user$.next(user);
    this.setUserDetailForm(user);
  }

  saveUser(id: number): void {
    const user = {
      ...this.user$.value,
      ...this.userDetailForm$.value?.getRawValue(),
    };
    this.setUserValue(user);
    const updatedUsers = this.users$.value.map((el) =>
      el.id === id ? user : el
    );
    this.setUsersValue(updatedUsers);
    console.log(this.users$.value);
  }

  setUserDetailForm(user: IUser): void {
    this.userDetailForm$.next(
      this.fb.group({
        email: [user.email],
        name: [user.name],
        phone: [user.phone],
        username: [user.username],
        website: [user.website],
      })
    );
  }
}
