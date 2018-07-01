import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { GestionReservasComponent } from './components/gestion-reservas/gestion-reservas.component';
import { GestionVehiculosComponent } from './components/gestion-vehiculos/gestion-vehiculos.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { GestionUsuariosComponent } from './components/gestion-usuarios/gestion-usuarios.component';
import { NovedadesComponent } from './components/novedades/novedades.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    GestionReservasComponent,
    GestionVehiculosComponent,
    ReservaComponent,
    GestionUsuariosComponent,
    NovedadesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
