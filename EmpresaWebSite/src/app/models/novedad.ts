import { Usuario } from "src/app/models/usuario";
import { Vehiculo } from "src/app/models/vehiculo";

export class Novedad {
    id:number;
    usuario:Usuario;
    texto:string;
    estado:string;

    constructor(id?:number,usuario?:Usuario,texto?:string,estado?:string){
        this.id = id;
        this.usuario = usuario;
        this.texto = texto;
        this.estado = estado;
        
    }

}
