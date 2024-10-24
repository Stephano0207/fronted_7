import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clientes } from 'src/app/modelos/clientes/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  url:string="http://127.0.0.1:8000/api/clientes" ;
  urlf:string="http://127.0.0.1:8000/api/filtradoCliente";
  constructor(private http:HttpClient) { }
  getAll(){
    return this.http.get<[Clientes]>(this.url);
  }

  save(cliente:Clientes){
    return this.http.post(this.url,cliente);
  }

  update(cliente:Clientes, id:number){
    return this.http.put(`${this.url}/${id}`,cliente);
  }

  destroy(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }

  getOne(id:number): Observable<Clientes>{
    return this.http.get<Clientes>(`${this.url}/${id}`);
  }

  filtrar(apellido: string): Observable<Clientes[]> {
    let params = new HttpParams().set('apellido', apellido);
    return this.http.get<Clientes[]>(this.urlf, { params });
  }
}
