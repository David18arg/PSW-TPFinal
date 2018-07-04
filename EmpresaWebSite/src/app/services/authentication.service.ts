import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Usuario } from '../models/usuario';

@Injectable()
export class AuthenticationService {
  userLoggedIn: Boolean = false;
  userLogged: Usuario;

  constructor(private http: Http) { }

  public login(usuario: string, password: string) {
    return this.http.post('http://localhost/EmpresaWebService/web/app_dev.php/usuario/authenticate',
     JSON.stringify({ usuario: usuario, password: password }))
        .map(res => res.json());
  }

  public logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.userLogged = new Usuario();
    this.userLoggedIn = false;
  }


}
