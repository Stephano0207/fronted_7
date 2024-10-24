import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorias } from 'src/app/modelos/categorias/categorias';
import { Productos } from 'src/app/modelos/productos/productos';
import { CategoriasService } from 'src/app/servicios/categorias/categorias.service';
import { ProductosService } from 'src/app/servicios/productos/productos.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  productoForm: FormGroup= this.fb.group({});
  categorias:Categorias[]=[];
  constructor(
    private service:ProductosService,
    private fb:FormBuilder,
    private router:Router,
    private serviceCategoria:CategoriasService
     ) {

     }

  ngOnInit() {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      id_categoria: ['', [Validators.required]],
    });
    this.serviceCategoria.getAll().subscribe((data)=>{
      this.categorias=data;
    });
  }
  save(){
    if (this.productoForm.valid) {
      const cliente: Productos = this.productoForm.value;
      this.service.save(cliente).subscribe(response => {
        console.log('Producto registrado con éxito', response);
        // Aquí puedes redirigir o mostrar un mensaje de éxito
        this.router.navigate(["/productos"]);
      }, error => {
        console.error('Error al registrar el producti', error);
      });
    } else {
      console.log('Formulario no válido');
    }
  }

}
