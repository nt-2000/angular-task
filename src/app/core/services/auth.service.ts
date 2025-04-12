import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Login } from '../models/interfaces/Login';
import { environment } from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: Login) {
    return this.http.post<any>(`${environment.apiUrl}student-login?lang=en&store=KW`, credentials).pipe(
      tap((response) => {
        if(response.status==200)
        {
          localStorage.setItem('access-token', response.token);
          localStorage.setItem('user.data', JSON.stringify(response.data));
        }
      })
    );
  }
}
