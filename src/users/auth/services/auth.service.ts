import { Injectable, inject } from '@angular/core';
import { Credentials } from '../models/credentials';
import { User } from 'src/users/models/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authResponse: BehaviorSubject<AuthResponse | undefined> = new BehaviorSubject<AuthResponse | undefined>(undefined)

  get isLogged(): boolean { // Creer un getter en typescript crée automatiquement une variable du même nom
    return !!this.authResponse.value
  }

  get currentUser(): User | undefined {
    return this.authResponse.value?.user
  }

  get currentRole(): string {
    return this.currentUser?.role ?? "PUBLIC"
  }

  get isAdmin() : boolean {
    return this.currentRole === "ADMIN"
  }

  get token(): string | undefined {
    return this.authResponse.value?.accessToken
  }

  private useLocal: boolean = false

  get remember() {
    return this.useLocal
  }

  set remember(value) {
    console.log(`Vous ${value ? 'acceptez' : 'refusez'} le stockage de données sur votre machine.`)
    this.useLocal = value
  }

  private readonly AUTH_KEY = "AUTHKEY"

  constructor(private http: HttpClient, private router: Router) {
    const storedResponse = sessionStorage.getItem(this.AUTH_KEY) ?? localStorage.getItem(this.AUTH_KEY)
    if(storedResponse) this.authResponse.next(JSON.parse(storedResponse))

    this.authResponse.subscribe(response => {
      if(response) (this.useLocal ? localStorage : sessionStorage).setItem(this.AUTH_KEY, JSON.stringify(response))
      else {
        sessionStorage.clear()
        localStorage.clear()
      }
    })
  }

  login(credentials: Credentials) {
    return this.http.post<AuthResponse>("/login", credentials)
    .pipe(tap(result => this.authResponse.next(result)))

  }

  register(user: User) {
    return this.http.post("/register", user)
  }

  logout() {
    this.authResponse.next(undefined)
    this.router.navigate(['/'])
  }
}

export const authGuard: CanActivateFn = () => {
  return inject(AuthService).isLogged || inject(Router).createUrlTree(['/login'])
}

export const adminGuard: CanActivateFn = () => {
  const isAdmin = inject(AuthService).isAdmin;
  if(isAdmin) return true;
  else {
    alert("Vous n'avez pas les droits d'accès nécessaires")
    return inject(Router).createUrlTree(['/'])
  }
}
