import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_PRINCIPAL } from '../utilities/constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  public register(nuevo_usuario: any): Promise<any> {
    return this.http.post(URL_PRINCIPAL + 'persona.php', nuevo_usuario).toPromise();
  }

  get(id: string): Promise<any> {
    return this.http.get(URL_PRINCIPAL + 'persona.php?id=' + id).toPromise();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
