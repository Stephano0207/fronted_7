import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../servicios/usuarios/usuarios.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuarios } from '../modelos/usuarios/usuarios';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  name:any;
  password:any;
  constructor(
    private service:UsuariosService,
    private router:Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }
  async  iniciarSesion(){
    let usuario:Usuarios={
      id:0,
      correo:this.name,
      contraseña:this.password
    }
    const alert= await this.alertController.create({
      header:"Exitoso",
      subHeader:"Iniciaste sesion exitosamente",
      message:"Iniciando sesión...",
      buttons:['OK']
    });

    const alertError = await this.alertController.create({
      header: 'Error',
      subHeader: 'No se pudo iniciar sesión',
      message: 'Verifica tus credenciales e inténtalo de nuevo.',
      buttons: ['OK'],
    });

    this.service.login(usuario).subscribe((res:any)=>{
      alert.present();
      this.router.navigate(["/home"]);
    },
    (error:any)=>{
      console.log("Error===",error)
      alertError.present();
    }
  )
  }

}
