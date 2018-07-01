import { Injectable } from '@angular/core';
import { Vehiculo } from './../models/vehiculo';

// Importamos los componentes que vamos a usar
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class VehiculosService {

  constructor(private _http: Http) { }

  getVehiculos() {
    // petición por get a esa url de un api rest de empresa de pasajes
    return this._http.get('http://localhost/EmpresaWebService/web/app_dev.php/vehiculo/')
    .map(res => res.json());
  }

  createVehiculo(vehiculo: Vehiculo) {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(vehiculo);
    console.log('entro service create');
    return this._http.post('http://localhost/EmpresaWebService/web/app_dev.php/vehiculo/new', body, options)
    .map((res: Response) => res.json());
  }

  deleteVehiculo(vehiculo: Vehiculo) {
    // utilizo el metodo delete de http que es el configurado en el deleteAction de Symfony
    return this._http.delete('http://localhost/EmpresaWebService/web/app_dev.php/vehiculo/delete/' + vehiculo.id)
    .map((res: Response) => res.json());
  }

  editVehiculo(vehiculo: Vehiculo) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(vehiculo);
    // envio en el body el mensaje transformado en un JSON
    return this._http.post('http://localhost/EmpresaWebService/web/app_dev.php/vehiculo/' + vehiculo.id + '/edit', body, options)
    .map((res: Response) => res.json());
  }
}
