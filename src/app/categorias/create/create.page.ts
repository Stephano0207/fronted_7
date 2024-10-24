import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorias } from 'src/app/modelos/categorias/categorias';
import { CategoriasService } from 'src/app/servicios/categorias/categorias.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  categoriaForm: FormGroup= this.fb.group({});
  constructor(
    private service:CategoriasService,
    private fb:FormBuilder,
    private router:Router
     ) {

     }

  ngOnInit() {
    this.categoriaForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
  }
  save(){
    if (this.categoriaForm.valid) {
      const cliente: Categorias = this.categoriaForm.value;
      this.service.save(cliente).subscribe(response => {
        console.log('Cliente registrado con éxito', response);
        // Aquí puedes redirigir o mostrar un mensaje de éxito
        this.router.navigate(["/categorias"]);
      }, error => {
        console.error('Error al registrar el cliente', error);
      });
    } else {
      console.log('Formulario no válido');
    }
  }

}
