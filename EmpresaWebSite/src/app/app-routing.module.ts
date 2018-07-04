import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { GestionReservasComponent } from './components/gestion-reservas/gestion-reservas.component';
import { GestionVehiculosComponent } from './components/gestion-vehiculos/gestion-vehiculos.component';
import { GestionUsuariosComponent } from './components/gestion-usuarios/gestion-usuarios.component';
import { LoginComponent } from './components/login/login.component';
import { NovedadesComponent } from './components/novedades/novedades.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'gestion-reservas', component: GestionReservasComponent },
  { path: 'gestion-vehiculos', component: GestionVehiculosComponent },
  { path: 'gestion-usuarios', component: GestionUsuariosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'novedades', component: NovedadesComponent },
  { path: 'reserva', component: ReservaComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
