import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css'],
  providers: [UsuariosService]
})
export class GestionUsuariosComponent implements OnInit {
  public usuario: Usuario;
  public usuarios: Array<Usuario>;
  public filterQuery = '';
  public rowsOnPage = 4;
  public sortBy = 'nombres';
  public sortOrder = 'asc';
  public btnAgregar: boolean;
  public btnModificar: boolean;
  public userExiste: Boolean = false;

  constructor(private servicio: UsuariosService) {
    this.usuario = new Usuario();
    this.usuarios = new Array<Usuario>();
    this.btnAgregar = true;
    this.btnModificar = false;
    this.mostrarUsuarios();
   }

  ngOnInit() {
  }

  public mostrarUsuarios() {
    this.servicio.getUsuarios().subscribe(
      result => {
        this.usuarios = JSON.parse(result.usuarios);
        console.log(this.usuarios);
      },
      error => {
        alert('Error en la petición');
      }
    );
  }

  public consultarUsuario() {
    this.servicio.getUsuarios().subscribe(
      result => {
        const usuarios = JSON.parse(result.usuarios);
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

  public guardarUsuario() {
    this.servicio.createUsuario(this.usuario).subscribe(
      data => {
      console.log('envio ok');
      this.mostrarUsuarios();
      this.usuario = new Usuario();
        return true;
      },
      error => {
      console.error('Error saving!');
        return false;
      }
    );
  }

  public elegirUsuario(user: Usuario) {
    this.usuario = new Usuario();
    this.usuario = user;
    this.btnAgregar = false;
    this.btnModificar = true;
  }

  public editarUsuario() {
    this.servicio.editUsuario(this.usuario).subscribe(
      data => {
        console.log('modificado correctamente.');
        this.mostrarUsuarios();
        this.btnAgregar = true;
        this.btnModificar = false;
        this.usuario = new Usuario();
        return true;
      },
      error => {
        console.error('Error updating!');
        console.log(error);
        return false;
      }
    );
  }

  public eliminarUsuario(user: Usuario) {
    this.servicio.deleteUsuario(user).subscribe(
      data => {
        console.log('borrado correctamente.');
        this.mostrarUsuarios();
        return true;
      },
      error => {
        console.error('Error deleting!');
        console.log(error);
        return false;
      }
    );
  }

  public limpiarCampos() {
    this.usuario = new Usuario();
  }

  public enviarFormulario() {
    if (this.btnAgregar) {this.guardarUsuario();
    } else { this.editarUsuario(); }
  }
}
