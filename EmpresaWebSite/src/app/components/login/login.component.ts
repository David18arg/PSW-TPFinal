import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userform: Usuario = new Usuario();
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public login() {
    this.authenticationService.login(this.userform.usuario, this.userform.password)
      .subscribe(
        data => {
          const user = JSON.parse(data.usuario);
          console.log(user);
          if (user.usuario != null) {
            // vbles para mostrar-ocultar cosas en el header
            this.authenticationService.userLoggedIn = true;
            this.authenticationService.userLogged = user;
            // localstorage usado para mostrar o no un componente
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.router.navigateByUrl('/home');
          }
        },
        error => {
          console.log('error...');
          console.log(error);
        });
  }

}
