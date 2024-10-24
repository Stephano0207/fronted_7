import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorias } from 'src/app/modelos/categorias/categorias';
import { CategoriasService } from 'src/app/servicios/categorias/categorias.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  id: number | undefined;

  categoriaForm: FormGroup = this.fb.group({});

  constructor(
    private route: ActivatedRoute,
    private service: CategoriasService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    const idparam = this.route.snapshot.paramMap.get('id')?.toString();
    if (idparam) {
      this.id = parseInt(idparam);
      if (!isNaN(this.id)) {
        this.loadCategoria();
      }
    }

    // Inicializar el formulario
    this.categoriaForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],

    });
  }

  // Método para actualizar el cliente
  update() {
    if (this.categoriaForm.valid && this.id !== undefined) {
      const cliente: Categorias = this.categoriaForm.value;
      this.service.update(cliente, this.id).subscribe(response => {
        console.log('Cliente actualizado con éxito', response);
        this.router.navigate(["/categorias"]);
        // Aquí puedes redirigir o mostrar un mensaje de éxito
      }, error => {
        console.error('Error al actualizar el cliente', error);
      });
    } else {
      console.log('Formulario no válido o ID indefinido');
    }
  }

  // Método para cargar los datos del cliente
  loadCategoria() {
    if (this.id !== undefined) {
      this.service.getOne(this.id).subscribe((cliente: Categorias) => {
        this.categoriaForm.patchValue({
          nombre: cliente.nombre,
          descripcion: cliente.descripcion,

        });
      }, error => {
        console.error('Error al cargar los datos del cliente', error);
      });
    }
  }
}
