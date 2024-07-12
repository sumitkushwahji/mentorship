import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const AUTH_API = 'http://localhost:8080/api/auth/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .post(AUTH_API + 'signin', { username, password }, httpOptions)
      .pipe(
        tap((res: any) => {
          if (res.jwt) {
            localStorage.setItem('token', res.jwt);
          }
        })
      );
  }

  register(
    employeeId: string,
    username: string,
    email: string,
    password: string,
    role: Array<string>
  ): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post(
      AUTH_API + 'signup',
      { employeeId, username, email, password, role },
      httpOptions
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
