import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public mostrarUsuarios() {
    this.servicio.getPasajes().subscribe(
      result => {
        this.pasajes = JSON.parse(result.pasajes);
        console.log(this.pasajes);
      },
      error => {
        alert('Error en la petición');
      }
    );
  }

  public guardarPasaje() {
    this.calcularPrecio();
    // console.log(this.pasaje);
    this.servicio.createPasaje(this.pasaje).subscribe(
      data => {
      console.log('envio ok');
      this.mostrarPasajes();
      this.pasaje = new Pasaje();
      this.seleccion = '';
        return true;
      },
      error => {
      console.error('Error saving!');
        return false;
      }
    );
  }

  public elegirPasaje(pas: Pasaje) {
    this.pasaje = new Pasaje();
    this.pasaje = pas;
    this.btnVenta = false;
    this.btnModificar = true;
    this.seleccion = this.categorias.filter(function (item) {
      return item.desc === pas.descuento;
    })[0];
  }

  public editarPasaje() {
    this.servicio.editPasaje(this.pasaje).subscribe(
      data => {
        console.log('modificado correctamente.');
        this.mostrarPasajes();
        this.btnVenta = true;
        this.btnModificar = false;
        this.pasaje = new Pasaje();
        this.seleccion = '';
        return true;
      },
      error => {
        console.error('Error updating!');
        console.log(error);
        return false;
      }
    );
  }

  public eliminarPasaje(pas: Pasaje) {
    this.servicio.deletePasaje(pas).subscribe(
      data => {
        console.log('borrado correctamente.');
        this.mostrarPasajes();
        return true;
      },
      error => {
        console.error('Error deleting!');
        console.log(error);
        return false;
      }
    );
  }

  public limpiarCampos() {
    this.pasaje = new Pasaje();
    this.seleccion = '';
  }

  public enviarFormulario() {
    if (this.btnVenta) {this.guardarPasaje();
    } else { this.editarPasaje(); }
  }
}
