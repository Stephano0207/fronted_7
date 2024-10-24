import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../servicios/categorias/categorias.service';
import { Categorias } from '../modelos/categorias/categorias';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  categorias:Categorias[]=[];
  categoriasFiltradas:Categorias[]=[];

  constructor(private service:CategoriasService){

  }
  filtrarCategorias(event:any){
    const valorBusqueda = event.target.value;

    if (valorBusqueda && valorBusqueda.trim() !== '') {
      this.service.filtrar(valorBusqueda).subscribe((clientes: Categorias[]) => {
        this.categoriasFiltradas = clientes;  // Actualizar la lista filtrada
      }, error => {
        console.error('Error al filtrar los clientes', error);
      });
    } else {
      this.categoriasFiltradas = this.categorias;  // Mostrar todos los clientes si no hay búsqueda
    }
  }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.service.getAll().subscribe(
      response=>{
        this.categorias=response;
        this.categoriasFiltradas=response;
      }
    )
  }

  ionViewWillEnter(){
    this.service.getAll().subscribe(
      response=>{
        this.categorias=response;
      }
    )
  }

  borrar(id:any){
    this.service.destroy(id).subscribe((response)=>{
      console.log("Borrardo", response);
      this.getAll();
    });
  }
}
