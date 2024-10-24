import { Component, OnInit } from '@angular/core';
import { Productos } from '../modelos/productos/productos';
import { ProductosService } from '../servicios/productos/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  productos:Productos[]=[];
  productosFiltrados: Productos[] = [];  // Lista de clientes filtrados

  constructor(private service:ProductosService){

  }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.service.getAll().subscribe(
      response=>{
        this.productos=response;
        this.productosFiltrados=response
      }
    )
  }

  ionViewWillEnter(){
    this.service.getAll().subscribe(
      response=>{
        this.productos=response;
      }
    )
  }

  borrar(id:any){
    this.service.destroy(id).subscribe((response)=>{
      console.log("Borrardo", response);
      this.getAll();
    });
  }

  filtrarProductos(event:any){
    const valorBusqueda = event.target.value;

    if (valorBusqueda && valorBusqueda.trim() !== '') {
      this.service.filtrar(valorBusqueda).subscribe((clientes: Productos[]) => {
        this.productosFiltrados = clientes;  // Actualizar la lista filtrada
      }, error => {
        console.error('Error al filtrar los clientes', error);
      });
    } else {
      this.productosFiltrados = this.productos;  // Mostrar todos los clientes si no hay búsqueda
    }
  }
}
