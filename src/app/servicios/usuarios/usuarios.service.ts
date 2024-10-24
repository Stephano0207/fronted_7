import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuarios } from 'src/app/modelos/usuarios/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient) { }
  url:any="http://localhost:8000/api/iniciarSesion/";
  login(user:any){
    return this.http.post(this.url,user);
  }
}
