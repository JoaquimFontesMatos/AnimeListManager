import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { FavoritedManga, User } from '../models/User';
import { environment } from '../../environments/environment';

const endpoint = environment.backendUrl + 'u/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(page: number, pageSize: number): Observable<User[]> {
    return this.http.get<User[]>(
      endpoint + 'users' + '?page=' + page + '&limit=' + pageSize
    );
  }

  getUser(): Observable<User> {
    return this.http.get<User>(endpoint + 'user');
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(endpoint + 'user', user);
  }

  deleteUser(): Observable<User> {
    return this.http.delete<User>(endpoint + 'user');
  }
}
