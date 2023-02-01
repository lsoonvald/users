import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject, take, takeUntil } from 'rxjs';
import { IUser } from '../model/user';
import { UserApiService } from './user-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserFacadeService implements OnDestroy {
  private fetchedUsers$ = new BehaviorSubject<IUser[]>([]);
  fetchedUsers = this.fetchedUsers$.asObservable();
  private users$ = new BehaviorSubject<IUser[]>([]);
  users = this.users$.asObservable();
  private user$ = new BehaviorSubject<IUser | undefined>(undefined);
  user = this.user$.asObservable();
  userDetailForm$ = new BehaviorSubject<FormGroup | undefined>(undefined);
  userDetailForm = this.userDetailForm$.asObservable();
  searchForm$ = new BehaviorSubject<FormGroup | undefined>(undefined);
  searchForm = this.searchForm$.asObservable();

  private unsubscribe$: Subject<void> = new Subject<void>();

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
    this.fetchedUsers$.next(users);
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

  filterUsersByName(value: string): void {
    this.users$.next(
      this.fetchedUsers$.value.filter((user) =>
        user.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  createSearchForm(): void {
    this.searchForm$.next(
      this.fb.group({
        name: [''],
      })
    );

    this.searchForm$.value?.controls['name'].valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        this.filterUsersByName(value);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
