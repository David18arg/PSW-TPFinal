import { Injectable } from '@angular/core';
import { Reserva } from './../models/reserva';

// Importamos los componentes que vamos a usar
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ReservasService {

  constructor(private _http: Http) { }

  getReservas() {
    // petición por get a esa url de un api rest de empresa de pasajes
    return this._http.get('http://localhost/EmpresaWebService/web/app_dev.php/reserva/')
    .map(res => res.json());
  }

  getVehiculos() {
    // petición por get a esa url de un api rest de empresa de pasajes
    return this._http.get('http://localhost/EmpresaWebService/web/app_dev.php/vehiculo/')
    .map(res => res.json());
  }

  createReserva(reserva: Reserva) {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(reserva);
    console.log('entro service create');
    return this._http.post('http://localhost/EmpresaWebService/web/app_dev.php/reserva/new', body, options)
    .map((res: Response) => res.json());
  }

  deleteReserva(reserva: Reserva) {
    // utilizo el metodo delete de http que es el configurado en el deleteAction de Symfony
    return this._http.delete('http://localhost/EmpresaWebService/web/app_dev.php/reserva/delete/' + reserva.id)
    .map((res: Response) => res.json());
  }

  editReserva(reserva: Reserva) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(reserva);
    // envio en el body el mensaje transformado en un JSON
    return this._http.post('http://localhost/EmpresaWebService/web/app_dev.php/reserva/' + reserva.id + '/edit', body, options)
    .map((res: Response) => res.json());
  }
}
