import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_PRINCIPAL } from '../utilities/constants';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) { }

  getGenres(): Promise<any> {
    return this.http.get(URL_PRINCIPAL + 'genero.php').toPromise();
  }

  listSongs(): Promise<any> {
    return this.http.get(URL_PRINCIPAL + 'persona.php').toPromise();
  }
  
  getSongsByUser(user: string): Promise<any> {
    return this.http.get(URL_PRINCIPAL + 'cancion.php?user=' + user).toPromise();
  }

  getSong(id: string): Promise<any> {
    return this.http.get(URL_PRINCIPAL + 'cancion.php?id=' + id).toPromise();
  }

  getSongGenre(id: string): Promise<any> {
    return this.http.get(URL_PRINCIPAL + 'genero.php?id=' + id).toPromise();
  }

  getSongByRecomendedGenre(genre_recomended: string): Promise<any> {
    return this.http.get(URL_PRINCIPAL + 'cancion.php?genre_recomended=' + genre_recomended).toPromise();
  }

  listSongsHome(): Promise<any> {
    return this.http.get(URL_PRINCIPAL + 'cancion.php?list=true').toPromise();
  }

  addSong(song: any): Promise<any> {
    return this.http.post(URL_PRINCIPAL + 'cancion.php', song).toPromise();
  }

}
