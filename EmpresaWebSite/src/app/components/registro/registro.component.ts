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
  public usuario: Usuario;
  public userExiste: Boolean = false;
  constructor(private servicio: UsuariosService) { }

  ngOnInit() {
  }

  public consultarUsuario() {
    this.servicio.getUsuarios().subscribe(
      result => {
        const usuarios = JSON.parse(result.pasajes);
         const user = usuarios.filter(function (item) {
          return item.usuario === this.usuario.usuario;
        })[0];
        if (user !== null) {
          this.userExiste = true;
        } else {
          this.userExiste = false;
        }
      },
      error => {
        alert('Error en la petición');
      }
    );
  }

  public enviarUsuario() {
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
