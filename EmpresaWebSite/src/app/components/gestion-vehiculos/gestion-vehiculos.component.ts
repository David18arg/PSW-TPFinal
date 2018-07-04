import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../models/vehiculo';
import { VehiculosService } from '../../services/vehiculos.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-gestion-vehiculos',
  templateUrl: './gestion-vehiculos.component.html',
  styleUrls: ['./gestion-vehiculos.component.css'],
  providers: [VehiculosService]
})

export class GestionVehiculosComponent implements OnInit {
  public vehiculo: Vehiculo;
  public vehiculos: Array<Vehiculo>;
  public formData: FormData;

  constructor(private servicio: VehiculosService, private _http: Http) {
    this.vehiculo = new Vehiculo();
    this.vehiculos = new Array<Vehiculo>();
    this.formData = new FormData();
    this.mostrarInscripciones();
  }

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

  public cargarInscripcion(imagen) {
    this.formData.append('imagen', imagen);
    this.formData.append('modelo', this.vehiculo.modelo);
    this.formData.append('patente', this.vehiculo.patente);
    this.formData.append('marca', this.vehiculo.marca);
    this.formData.append('disponible', true.toString());
  }

  public enviarInscripcion() {
    this.mostrarInscripciones();
    this._http.post('http://localhost/EmpresaWebService/web/app_dev.php/vehiculo/new', this.formData).subscribe(
      (data) => {console.log(data); }
    );
  }

}
