import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  AuthService
} from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from 'src/app/services/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public loading = false;
  register_form: FormGroup;
  pattern: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  generos: Array<any>;
  generos_elegidos: Array<number> = [];

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService, private generalService: GeneralService) { 
    this.register_form = this.createFormGroup();
  }

  ngOnInit(): void {
    this.getGeneres();
  }

  getGeneres() {
    this.generalService.getGenres().then(res => {
      this.generos = res;
    });
  }

  createFormGroup() {
    return new FormGroup({
      'nombre': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
      'nombre_usuario': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  register(): void {
    this.loading = true;
    let elegidos: string = "";
    this.generos_elegidos.forEach(e => {
      elegidos = elegidos + e + ",";
    });
    elegidos = elegidos.slice(0, -1);
    const objR = new HttpParams().set("nombre", this.register_form.value.nombre)
      .set("email", this.register_form.value.email)
      .set("nombre_usuario", this.register_form.value.nombre_usuario)
      .set("password", this.register_form.value.password)
      .set("generos", elegidos);
      console.log(objR);
    this.authService.register(objR).then((res: any) => {
      this.toastr.success("Usuario guardado, por favor inicia sesión");
      localStorage.setItem('id', res);
      this.router.navigate(['/home']);
      this.loading = false;
    }).catch(err => {
      this.toastr.error("Error, por favor. Inténtelo más tarde");
      console.log(err.response);
      this.loading = false;
    });
  }

  addGenre(row: any) {
    const indice = this.generos_elegidos.indexOf(row.id);
    if(indice === -1)
      this.generos_elegidos.push(row.id);
    else 
      this.generos_elegidos.splice(indice, 1);
  }

  get nombre_usuario() {
    return this.register_form.get('nombre_usuario');
  }

  get nombre() {
    return this.register_form.get('nombre');
  }

  get email() {
    return this.register_form.get('email');
  }

  get password() {
    return this.register_form.get('password');
  }

}
