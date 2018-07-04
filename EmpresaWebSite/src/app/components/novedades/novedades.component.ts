import { Component, OnInit } from '@angular/core';
import { Novedad } from '../../models/novedad';
import { Usuario } from '../../models/usuario';
import { Reserva } from '../../models/reserva';
import { NovedadesService } from '../../services/novedades.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css'],
  providers: [NovedadesService]
})
export class NovedadesComponent implements OnInit {
  public novedad: Novedad;
  public novedades: Array<Novedad>;
  public reservas: Array<Reserva>;
  public usuario: Usuario;

  constructor(private servicio: NovedadesService, public authenticationService: AuthenticationService) {
    this.usuario = authenticationService.userLogged;
    this.novedad = new Novedad();
    this.novedades = new Array<Novedad>();
    this.reservas = new Array<Reserva>();
    this.mostrarNovedades();
    this.mostrarReservas();
   }

  ngOnInit() {
  }

  public mostrarNovedades() {
    this.servicio.getNovedades().subscribe(
      result => {
        this.novedades = JSON.parse(result.novedades);
      },
      error => {
        alert('Error en la petición');
      }
    );
  }

  public mostrarReservas() {
    this.servicio.getReservas().subscribe(
      result => {
        this.reservas = JSON.parse(result.reservas);
        this.reservas = this.reservas.filter(
          reserva => reserva.usuario === this.usuario);
      },
      error => {
        alert('Error en la petición');
      }
    );
  }

  public guardarNovedad() {
    this.novedad.fechaMsj = new Date();
    this.servicio.createNovedad(this.novedad).subscribe(
      data => {
        console.log('envio ok');
        console.log(this.novedad);
        this.mostrarNovedades();
        this.novedad = new Novedad();
        return true;
      },
      error => {
        console.error('Error saving!');
        return false;
      }
    );
  }

  public editarNovedad() {
    this.novedad.fechaMsj = new Date();
    // seteo nuevamente la fecha actual para el msj modificado
    this.servicio.editNovedad(this.novedad).subscribe(
      data => {
        console.log('modificado correctamente.');
        // actualizo la tabla de mensajes
        this.mostrarNovedades();
        this.novedad = new Novedad();
        return true;
      },
      error => {
        console.error('Error updating!');
        console.log(error);
        return false;
      }
    );
  }

  public seleccionarNovedad(nov: Novedad) {
    this.novedad = nov;
  }

  public eliminarNovedad(nov: Novedad) {
    this.servicio.deleteNovedad(nov).subscribe(
      data => {
        console.log('borrado correctamente.');
        this.mostrarNovedades();
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
