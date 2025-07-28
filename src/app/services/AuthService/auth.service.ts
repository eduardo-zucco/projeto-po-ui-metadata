import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthResponse, LoginDto } from '../../interfaces/login/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private serviceApi = 'http://localhost:5000/api/login';

  constructor(private http: HttpClient) { }

  login(loginDto: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.serviceApi}`, loginDto)
  }

  saveToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('accessToken');
  }
}
