import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Clientes } from 'src/app/modelos/clientes/clientes';
import { ClientesService } from 'src/app/servicios/clientes/clientes.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
clienteForm: FormGroup= this.fb.group({});
  constructor(
    private service:ClientesService,
    private fb:FormBuilder,
    private router:Router
     ) {

     }

  ngOnInit() {
    this.clienteForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.minLength(8)]],
      edad: ['', [Validators.required, Validators.min(1)]],
    });
  }
  save(){
    if (this.clienteForm.valid) {
      const cliente: Clientes = this.clienteForm.value;
      this.service.save(cliente).subscribe(response => {
        console.log('Cliente registrado con éxito', response);
        // Aquí puedes redirigir o mostrar un mensaje de éxito
        this.router.navigate(["/clientes"]);
      }, error => {
        console.error('Error al registrar el cliente', error);
      });
    } else {
      console.log('Formulario no válido');
    }
  }

}
