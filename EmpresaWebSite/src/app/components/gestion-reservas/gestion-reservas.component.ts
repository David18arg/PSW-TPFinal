import { Component, OnInit } from '@angular/core';
import { Reserva } from '../../models/reserva';
import { Vehiculo } from '../../models/vehiculo';
import { Usuario } from '../../models/usuario';
import { ReservasService } from '../../services/reservas.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-gestion-reservas',
  templateUrl: './gestion-reservas.component.html',
  styleUrls: ['./gestion-reservas.component.css'],
  providers: [ReservasService]
})
export class GestionReservasComponent implements OnInit {
  public reserva: Reserva;
  public usuario: Usuario;
  public reservas: Array<Reserva>;
  public usuarios: Array<Usuario>;
  public vehiculos: Array<Vehiculo>;
  public filterQuery = '';
  public rowsOnPage = 4;
  public sortBy = 'nombres';
  public sortOrder = 'asc';
  public btnAgregar: boolean;
  public btnModificar: boolean;
  public fech;

  constructor(private servicio: ReservasService, public authenticationService: AuthenticationService) {
    this.reserva = new Reserva();
    this.usuario = new Usuario();
    this.reservas = new Array<Reserva>();
    this.usuarios = new Array<Usuario>();
    this.vehiculos = new Array<Vehiculo>();
    this.mostrarReservas();
    this.mostrarVehiculos();
    this.mostrarUsuarios();
    this.btnAgregar = true;
    this.btnModificar = false;
  }

  ngOnInit() {
  }

  public mostrarReservas() {
    this.servicio.getReservas().subscribe(
      result => {
        this.reservas = JSON.parse(result.reservas);
      },
      error => {
        alert('Error en la petición');
      }
    );
  }

  public mostrarVehiculos() {
    this.servicio.getVehiculos().subscribe(
      result => {
        this.vehiculos = JSON.parse(result.vehiculos);
        console.log(this.vehiculos);
      },
      error => {
        alert('Error en la petición');
      }
    );
  }

  public mostrarUsuarios() {
    this.servicio.getUsuarios().subscribe(
      result => {
        this.usuarios = JSON.parse(result.usuarios);
      },
      error => {
        alert('Error en la petición');
      }
    );
  }

  public guardarReserva() {
    this.servicio.createReserva(this.reserva).subscribe(
      data => {
        console.log('envio ok');
        console.log(this.reserva);
        this.mostrarReservas();
        this.reserva = new Reserva();
        this.fech = null;
        return true;
      },
      error => {
        console.error('Error saving!');
        return false;
      }
    );
  }

  public cambiarEstado(item) {
    this.reserva = item;
    if (item.estado === 'Aceptado') {
      this.reserva.estado = 'Pendiente';
    } else {
      this.reserva.estado = 'Aceptado';
    }
  }

  public editarReserva() {
    // seteo nuevamente la fecha actual para el msj modificado
    this.servicio.editReserva(this.reserva).subscribe(
      data => {
        console.log('modificado correctamente.');
        // actualizo la tabla de mensajes
        this.mostrarReservas();
        this.reserva = new Reserva();
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
    if (this.fech !== null) {
      const f = this.fech.split('-');
    this.reserva.fechaRenta = new Date(f[0], f[1] - 1, f[2], 10, 0, 0);
    }
  }

  public mostrarFecha() {
    /* .stringify(): de objeto javascript a cadena JSON, y .parse(): de cadena JSON a objecto javascript */
    const fechaStr = JSON.stringify(this.reserva.fechaRenta);
    this.reserva.fechaRenta = JSON.parse(fechaStr, (key, value) => {
      if (key === 'timestamp') {
        const par: any = new Date(value * 999.9894).toISOString().substring(0, 10);
        const f = par.split('-');
        this.fech = f[0] + '-' + f[1] + '-' + f[2];
      } return value;
    });
  }

  public seleccionarReservan(res: Reserva) {
    this.reserva = res;
    this.mostrarFecha();
    this.btnAgregar = false;
    this.btnModificar = true;
    this.reserva.vehiculo = this.vehiculos.filter(function (item) {
      return item === res.vehiculo;
    })[0];
  }

  public eliminarReserva(res: Reserva) {
    this.servicio.deleteReserva(res).subscribe(
      data => {
        console.log('borrado correctamente.');
        this.mostrarReservas();
        return true;
      },
      error => {
        console.error('Error deleting!');
        console.log(error);
        return false;
      }
    );
  }

  public modalReserva() {
    this.reserva = new Reserva();
    this.btnAgregar = true;
    this.btnModificar = false;
    this.fech = null;
  }

  public enviarFormulario() {
    if (this.btnAgregar) {this.guardarReserva();
    } else { this.editarReserva(); }
  }
}
