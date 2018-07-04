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
  public reserva: Reserva;
  public reservas: Array<Reserva>;
  public filterQuery = '';
  public rowsOnPage = 4;
  public sortBy = '';
  public sortOrder = 'asc';
  public btnAgregar: boolean;
  public btnModificar: boolean;

  constructor(private servicio: ReservasService,
    public authenticationService: AuthenticationService) { }

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

  public guardarInscripcion() {
    this.reserva.fechaRenta = new Date();
    this.servicio.createReserva(this.reserva).subscribe(
      data => {
        console.log('envio ok');
        console.log(this.reserva);
        this.mostrarReservas();
        this.reserva = new Reserva();
        return true;
      },
      error => {
        console.error('Error saving!');
        return false;
      }
    );
  }

  public editarReserva() {
    // seteo nuevamente la fecha actual para el msj modificado
    this.servicio.editReserva(this.reserva).subscribe(
      data => {
        console.log('modificado correctamente.');
        // actualizo la tabla de mensajes
        this.mostrarReservas();
        this.reserva = new Reserva();
        return true;
      },
      error => {
        console.error('Error updating!');
        console.log(error);
        return false;
      }
    );
  }

  public seleccionarReserva(res: Reserva) {
    this.reserva = res;
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

}
