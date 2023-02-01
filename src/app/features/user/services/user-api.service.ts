import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private http: HttpClient) {}

  getUserList(): Observable<IUser[]> {
    return this.http.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
  }

  getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
  }
}
