import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: any;
  songs: Array<any> = [];
  current_song: any;
  current_song_genre: any;
  songs_recomended: Array<any> = [];
  persons_recomended: Array<any> = [];

  constructor(private authService: AuthService, private generalService: GeneralService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProfile();
    this.getSongsByUser();
    this.getUsers();
    this.listSongs();
  }

  listSongs() {
    this.generalService.listSongsHome().then((res: any) => {
      this.songs_recomended = res;
    });
  }

  getUsers() {
    this.generalService.listSongs().then((res: any) => {
      this.persons_recomended = res;
    });
  }

  getProfile() {
    this.authService.get(localStorage.getItem("id")).then((res: any) => {
      this.user = res;
    });
  }

  getSongsByUser() {
    this.generalService.getSongsByUser(localStorage.getItem("id")).then((res: any) => {
      this.songs = res;
    });
  }

  getGenreSong(id: string) {
    this.generalService.getSongGenre(id).then((res: any) => {
      this.current_song_genre = res;
      this.getSongsRecomendedGenre(this.current_song_genre.ID);
    });
  }

  getSongsRecomendedGenre(genre_recomended: string) {
    this.generalService.getSongByRecomendedGenre(genre_recomended).then((res: any) => {
      this.songs_recomended = res;
    });
  }

  getSong(id: any) {
    this.generalService.getSong(id).then((res: any) => {
      this.current_song = res;
      this.getGenreSong(this.current_song.ID);
    });
  }
  
  async addSong(row) {
    let a = new HttpParams().set("song_id", row.id).set("user_id", localStorage.getItem('id'));
    this.reload();
    await this.generalService.addSong(a);
  }

  reload() {
    setTimeout(() => {
      this.toastr.success("Agregado exitosamente");
      this.getSongsByUser();
    }, 2000);
  }

  logout() {
    this.authService.logout();
  }

}
