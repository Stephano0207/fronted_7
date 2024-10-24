import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../servicios/clientes/clientes.service';
import { Clientes } from '../modelos/clientes/clientes';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  clientes: Clientes[] = [];  // Lista original de clientes
  clientesFiltrados: Clientes[] = [];  // Lista de clientes filtrados

  constructor(private service:ClientesService) { }

  ngOnInit() {
    this.getAll();
  }

  filtrarClientes(event: any) {
    const valorBusqueda = event.target.value;

    if (valorBusqueda && valorBusqueda.trim() !== '') {
      this.service.filtrar(valorBusqueda).subscribe((clientes: Clientes[]) => {
        this.clientesFiltrados = clientes;  // Actualizar la lista filtrada
      }, error => {
        console.error('Error al filtrar los clientes', error);
      });
    } else {
      this.clientesFiltrados = this.clientes;  // Mostrar todos los clientes si no hay búsqueda
    }
  }

  getAll(){
    this.service.getAll().subscribe(
      response=>{
        this.clientes = response;
        this.clientesFiltrados = response;
      }
    )
  }

  ionViewWillEnter(){
    this.service.getAll().subscribe(
      response=>{
        this.clientes=response;
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
