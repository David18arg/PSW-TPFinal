import { Injectable } from '@angular/core';
import { Usuario } from './../models/usuario';

// Importamos los componentes que vamos a usar
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UsuariosService {

  constructor(private _http: Http) { }

  getUsuarios() {
    // petición por get a esa url de un api rest de empresa de pasajes
    return this._http.get('http://localhost/EmpresaWebService/web/app_dev.php/usuario/')
    .map(res => res.json());
  }

  createUsuario(usuario: Usuario) {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(usuario);
    console.log('entro service create');
    return this._http.post('http://localhost/EmpresaWebService/web/app_dev.php/usuario/new', body, options)
    .map((res: Response) => res.json());
  }

  deleteUsuario(usuario: Usuario) {
    // utilizo el metodo delete de http que es el configurado en el deleteAction de Symfony
    return this._http.delete('http://localhost/EmpresaWebService/web/app_dev.php/usuario/delete/' + usuario.id)
    .map((res: Response) => res.json());
  }

  editUsuario(usuario: Usuario) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(usuario);
    // envio en el body el mensaje transformado en un JSON
    return this._http.post('http://localhost/EmpresaWebService/web/app_dev.php/usuario/' + usuario.id + '/edit', body, options)
    .map((res: Response) => res.json());
  }
}
