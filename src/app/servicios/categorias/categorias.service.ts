import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorias } from 'src/app/modelos/categorias/categorias';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  urlf:string="http://127.0.0.1:8000/api/filtradoCategoria";
  url:string="http://127.0.0.1:8000/api/categorias" ;
  constructor(private http:HttpClient) { }
  getAll(){
    return this.http.get<[Categorias]>(this.url);
  }

  save(cliente:Categorias){
    return this.http.post(this.url,cliente);
  }

  update(cliente:Categorias, id:number){
    return this.http.put(`${this.url}/${id}`,cliente);
  }

  destroy(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }

  getOne(id:number): Observable<Categorias>{
    return this.http.get<Categorias>(`${this.url}/${id}`);
  }
  filtrar(descripcion: string): Observable<Categorias[]> {
    let params = new HttpParams().set('descripcion', descripcion);
    return this.http.get<Categorias[]>(this.urlf, { params });
  }

}
