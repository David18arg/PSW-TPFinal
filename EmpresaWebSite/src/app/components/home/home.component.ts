import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public mostrarInscripciones() {
    this.servicio.getVehiculos().subscribe(
      result => {
        this.vehiculos = JSON.parse(result.vehiculos);
        console.log(this.vehiculos);
      },
      error => {
        alert('Error en la petición');
      }
    );
  }
}
