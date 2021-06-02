import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_PRINCIPAL } from '../utilities/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public register(nuevo_usuario: any): Promise<any> {
    return this.http.post(URL_PRINCIPAL + 'persona.php', nuevo_usuario).toPromise();
  }

  get(): Promise<any> {
    return this.http.get(URL_PRINCIPAL + 'persona.php').toPromise();
  }

}
