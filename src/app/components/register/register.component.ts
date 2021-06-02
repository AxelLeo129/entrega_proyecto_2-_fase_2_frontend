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

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public loading = false;
  register_form: FormGroup;
  pattern: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private authService: AuthService, private toastr: ToastrService) { 
    this.register_form = this.createFormGroup();
  }

  ngOnInit(): void {
    this.authService.get().then(res => {
      console.log(res);
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
    const objR = new HttpParams().set("nombre", this.register_form.value.nombre)
      .set("email", this.register_form.value.email)
      .set("nombre_usuario", this.register_form.value.nombre_usuario)
      .set("password", this.register_form.value.password);
    this.authService.register(objR).then((res: any) => {
      this.toastr.success("Usuario guardado, por favor inicia sesión");
      this.loading = false;
    }).catch(err => {
      this.toastr.error("Error, por favor. Inténtelo más tarde");
      console.log(err.response);
      this.loading = false;
    });
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
