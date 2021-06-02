import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_PRINCIPAL } from '../utilities/constants';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) { }

  

}
