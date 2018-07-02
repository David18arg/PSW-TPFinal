import { Component, OnInit } from '@angular/core';
import { Usuario } from "./../../models/usuario";
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
import { UsuariosService } from '../../servicios/usuarios.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../servicios/authentication.service';



@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css'],
  providers: [UsuariosService]
})
export class GestionUsuariosComponent implements OnInit {
  usuarioGestion: Usuario;
  usuarioSeleccionado: Usuario;
  usuariosGestion: Array<Usuario>

  constructor(private modalService: NgbModal, private servicio: UsuariosService, public authenticationService: AuthenticationService) {
    this.usuarioGestion = new Usuario();
    this.usuarioSeleccionado = new Usuario();
    this.usuariosGestion = new Array();
  }

  ngOnInit() {
  }

  public mostrarUsuarios() {
    // Llamamos al método del servicio
    // para cargar todos los usuarios
    this.servicio.getUsuarios().subscribe(
      result => {
        this.usuariosGestion = JSON.parse(result.usuarios);
        console.log("usuarios cargados");
        console.log(this.usuariosGestion);
      },
      error => {
        alert("Error en la petición de usuarios");
      }
    );
  }


  //enviar usuario

  public enviarUsuario() {
    this.servicio.cargarUsuario(this.usuarioGestion).subscribe(
      data => {
        console.log("envio ok");
        console.log("usuario agregado correctamente.");
        console.log(this.usuariosGestion);
        return true;
      },
      error => {
        console.error("Error en el envio del usuario!");
        return false;
      }
    );
  }

  //seleccionar usuario

  public seleccionarUsuario(us: Usuario) {
    this.usuarioSeleccionado = us;
  }

  //Actualizar usuario

  public actualizarUsuario() {
    this.servicio.modificarUsuario(this.usuarioSeleccionado).subscribe(
      data => {
        console.log("usuario modificado correctamente.");
        console.log(this.usuariosGestion);
        //actualizo la tabla de inscripciones
        this.mostrarUsuarios();
        return true;
      },
      error => {
        console.error("Error en la modificacion!");
        console.log(error);
        return false;
      });
  }

  //Eliminar usuario

  public eliminarUsuario(us: Usuario) {
    this.servicio.eliminarUsuario(us).subscribe(
      data => {
        console.log("usuario borrado correctamente.")
        //actualizo la tabla de usuarios
        console.log(this.usuariosGestion);
        this.mostrarUsuarios();
        return true;
      },
      error => {
        console.error("Error en el borrado del usuario");
        console.log(error);
        return false;
      }
    )
  }

  //Metodos del Modal

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



}
