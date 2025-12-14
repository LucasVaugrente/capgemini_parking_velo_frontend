import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface LoginResponse {
  success: boolean;
  token?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private url = 'http://localhost:8080/auth/login';
  private loggedKey = 'logged';
  private rememberKey = 'rememberMe';

  constructor(private http: HttpClient) {}

  login(mail: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.url, { mail: mail.trim(), password: password.trim() }).pipe(
      map(res => res),
      catchError(err => {
        console.error('Erreur login', err);
        return of({ success: false });
      })
    );
  }

  setLogged() {
    localStorage.setItem(this.loggedKey, 'true');
  }

  isLogged(): boolean {
    return localStorage.getItem(this.loggedKey) === 'true';
  }

  rememberMe() {
    localStorage.setItem(this.rememberKey, 'true');
    this.setLogged();
  }

  logout() {
    localStorage.removeItem(this.loggedKey);
    localStorage.removeItem(this.rememberKey);
  }
}
