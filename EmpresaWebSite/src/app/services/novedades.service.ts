import { Injectable } from '@angular/core';
import { Novedad } from './../models/novedad';

// Importamos los componentes que vamos a usar
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class NovedadesService {

  constructor(private _http: Http) { }

  getNovedades() {
    // petición por get a esa url de un api rest de empresa de pasajes
    return this._http.get('http://localhost/EmpresaWebService/web/app_dev.php/novedad/')
    .map(res => res.json());
  }

  getReservas() {
    // petición por get a esa url de un api rest de empresa de pasajes
    return this._http.get('http://localhost/EmpresaWebService/web/app_dev.php/reserva/')
    .map(res => res.json());
  }

  createNovedad(novedad: Novedad) {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(novedad);
    console.log('entro service create');
    return this._http.post('http://localhost/EmpresaWebService/web/app_dev.php/novedad/new', body, options)
    .map((res: Response) => res.json());
  }

  deleteNovedad(novedad: Novedad) {
    // utilizo el metodo delete de http que es el configurado en el deleteAction de Symfony
    return this._http.delete('http://localhost/EmpresaWebService/web/app_dev.php/novedad/delete/' + novedad.id)
    .map((res: Response) => res.json());
  }

  editNovedad(novedad: Novedad) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(novedad);
    // envio en el body el mensaje transformado en un JSON
    return this._http.post('http://localhost/EmpresaWebService/web/app_dev.php/novedad/' + novedad.id + '/edit', body, options)
    .map((res: Response) => res.json());
  }
}
