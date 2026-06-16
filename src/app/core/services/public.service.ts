import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PublicAuthService {
  private readonly TOKEN_KEY = 'public_access_token';

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

 readonly authUser = signal("Sam")

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}