import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [UsuariosService]
})
export class RegistroComponent implements OnInit {

  constructor(private servicio: UsuariosService) { }

  ngOnInit() {
  }
  
  public guardarUsuario() {
    // console.log(this.pasaje);
    this.servicio.createUsuario(this.usuario).subscribe(
      data => {
      console.log('envio ok');
      this.usuario = new Usuario();
        return true;
      },
      error => {
      console.error('Error saving!');
        return false;
      }
    );
  }
}
