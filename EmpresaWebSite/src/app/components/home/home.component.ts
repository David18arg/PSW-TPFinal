import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../models/vehiculo';
import { VehiculosService } from '../../services/vehiculos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [VehiculosService]
})
export class HomeComponent implements OnInit {
  public vehiculos: Array<Vehiculo>;

  constructor(private servicio: VehiculosService) {
    this.vehiculos = new Array<Vehiculo>();
    this.mostrarVehiculos();
   }

  ngOnInit() {
  }

  public mostrarVehiculos() {
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
