import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorias } from 'src/app/modelos/categorias/categorias';
import { Productos } from 'src/app/modelos/productos/productos';
import { CategoriasService } from 'src/app/servicios/categorias/categorias.service';
import { ProductosService } from 'src/app/servicios/productos/productos.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  id: number | undefined;

  productoForm: FormGroup = this.fb.group({});
categorias:Categorias[]=[];
  constructor(
    private route: ActivatedRoute,
    private service: ProductosService,
    private fb: FormBuilder,
    private router: Router,
    private serviceCategoria:CategoriasService
  ) {}

  ngOnInit() {
    const idparam = this.route.snapshot.paramMap.get('id')?.toString();
    if (idparam) {
      this.id = parseInt(idparam);
      if (!isNaN(this.id)) {
        this.loadCliente();
      }
    }

    // Inicializar el formulario
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      id_categoria: ['', [Validators.required]],
    });

    this.serviceCategoria.getAll().subscribe((data)=>{
      this.categorias=data;
    })
  }

  // Método para actualizar el cliente
  update() {
    if (this.productoForm.valid && this.id !== undefined) {
      const cliente: Productos = this.productoForm.value;
      this.service.update(cliente, this.id).subscribe(response => {
        console.log('Cliente actualizado con éxito', response);
        this.router.navigate(["/productos"]);
        // Aquí puedes redirigir o mostrar un mensaje de éxito
      }, error => {
        console.error('Error al actualizar el cliente', error);
      });
    } else {
      console.log('Formulario no válido o ID indefinido');
    }
  }

  // Método para cargar los datos del cliente
  loadCliente() {
    if (this.id !== undefined) {
      this.service.getOne(this.id).subscribe((cliente: Productos) => {
        this.productoForm.patchValue({
          nombre: cliente.nombre,
          descripcion: cliente.descripcion,
          cantidad: cliente.cantidad,
          id_categoria: cliente.id_categoria,
        });
      }, error => {
        console.error('Error al cargar los datos del cliente', error);
      });
    }
  }
}
