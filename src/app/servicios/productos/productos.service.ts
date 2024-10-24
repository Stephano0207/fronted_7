import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Productos } from 'src/app/modelos/productos/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  url:string="http://127.0.0.1:8000/api/productos" ;
  urlf:string="http://127.0.0.1:8000/api/filtradoProducto";
  constructor(private http:HttpClient) { }
  getAll(){
    return this.http.get<[Productos]>(this.url);
  }

  save(cliente:Productos){
    return this.http.post(this.url,cliente);
  }

  update(cliente:Productos, id:number){
    return this.http.put(`${this.url}/${id}`,cliente);
  }

  destroy(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }

  getOne(id:number): Observable<Productos>{
    return this.http.get<Productos>(`${this.url}/${id}`);
  }
  filtrar(descripcion: string): Observable<Productos[]> {
    let params = new HttpParams().set('descripcion', descripcion);
    return this.http.get<Productos[]>(this.urlf, { params });
  }
}
