import { Component, OnInit } from '@angular/core';
import { Reserva } from './../../models/reserva';
import { AuthenticationService } from '../../services/authentication.service';
import { ReservasService } from '../../services/reservas.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  constructor(private servicio: ReservasService,
    public authenticationService: AuthenticationService
) { }

  ngOnInit() {
  }

  public mostrarCategorias() {
    this.servicio.getCategorias().subscribe(
      result => {
        this.categorias = JSON.parse(result.categorias);
      },
      error => {
        alert('Error en la petición');
      }
    );
  }

  public mostrarInscripciones() {
    this.servicio.getInscripciones().subscribe(
      result => {
        this.inscripciones = JSON.parse(result.inscripciones);
        console.log(this.inscripciones);
      },
      error => {
        alert('Error en la petición');
      }
    );
  }

  public guardarInscripcion() {
    this.servicio.createInscripcion(this.inscripcion).subscribe(
      data => {
        console.log('envio ok');
        console.log(this.inscripcion);
        this.mostrarInscripciones();
        this.inscripcion = new Inscripcion();
        this.fech = null;
        return true;
      },
      error => {
        console.error('Error saving!');
        return false;
      }
    );
  }

  public editarInscripcion() {
    // seteo nuevamente la fecha actual para el msj modificado
    this.servicio.editInscripcion(this.inscripcion).subscribe(
      data => {
        console.log('modificado correctamente.');
        // actualizo la tabla de mensajes
        this.mostrarInscripciones();
        this.inscripcion = new Inscripcion();
        this.fech = null;
        return true;
      },
      error => {
        console.error('Error updating!');
        console.log(error);
        return false;
      }
    );
  }

  public actualizarFecha() {
    const f = this.fech.split('-');
    this.inscripcion.fecha = new Date(f[0], f[1] - 1, f[2], 10, 0, 0);
  }

  public mostrarFecha() {
    /* .stringify(): de objeto javascript a cadena JSON, y .parse(): de cadena JSON a objecto javascript */
    const fechaStr = JSON.stringify(this.inscripcion.fecha);
    this.inscripcion.fecha = JSON.parse(fechaStr, (key, value) => {
      if (key === 'timestamp') {
        const par: any = new Date(value * 999.9894).toISOString().substring(0, 10);
        const f = par.split('-');
        this.fech = f[0] + '-' + f[1] + '-' + f[2];
      } return value;
    });
  }

  public seleccionarInscripcion(ins: Inscripcion) {
    this.inscripcion = ins;
    this.mostrarFecha();
    this.btnAgregar = false;
    this.btnModificar = true;
    this.inscripcion.categoria = this.categorias.filter(function (item) {
      return item.nombre === ins.categoria.nombre;
    })[0];
  }

  public eliminarInscripcion(ins: Inscripcion) {
    this.servicio.deleteInscripcion(ins).subscribe(
      data => {
        console.log('borrado correctamente.');
        this.mostrarInscripciones();
        return true;
      },
      error => {
        console.error('Error deleting!');
        console.log(error);
        return false;
      }
    );
  }

  public modalInscripcion() {
    this.inscripcion = new Inscripcion();
    this.btnAgregar = true;
    this.btnModificar = false;
    this.fech = null;
  }

  public enviarFormulario() {
    if (this.btnAgregar) {this.guardarInscripcion();
    } else { this.editarInscripcion(); }
  }
}
