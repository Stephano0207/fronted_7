import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Clientes } from 'src/app/modelos/clientes/clientes';
import { ClientesService } from 'src/app/servicios/clientes/clientes.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  id: number | undefined;

  clienteForm: FormGroup = this.fb.group({});

  constructor(
    private route: ActivatedRoute,
    private service: ClientesService,
    private fb: FormBuilder,
    private router: Router
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
    this.clienteForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.minLength(8)]],
      edad: ['', [Validators.required, Validators.min(1)]],
    });
  }

  // Método para actualizar el cliente
  update() {
    if (this.clienteForm.valid && this.id !== undefined) {
      const cliente: Clientes = this.clienteForm.value;
      this.service.update(cliente, this.id).subscribe(response => {
        console.log('Cliente actualizado con éxito', response);
        this.router.navigate(["/clientes"]);
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
      this.service.getOne(this.id).subscribe((cliente: Clientes) => {
        this.clienteForm.patchValue({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          direccion: cliente.direccion,
          dni: cliente.dni,
          edad: cliente.edad,
        });
      }, error => {
        console.error('Error al cargar los datos del cliente', error);
      });
    }
  }
}
