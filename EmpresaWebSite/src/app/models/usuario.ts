import { userInfo } from "os";

export class Usuario {
    id:number;
    apellidos:string;
    nombres:string;
    dni:number;
    email:string;
    telefono:number;
    usuario:string;
    password:string;
    perfil:string;

    constructor(id?:number,apellidos?:string,nombres?:string,dni?:number,email?:string,telefono?:number,usuario?:string,password?:string,perfil?:string){
        this.id = id;
        this.apellidos = apellidos;
        this.nombres = nombres;
        this.dni = dni;
        this.email = email;
        this.telefono = telefono;
        this.usuario = usuario;
        this.password = password;
        this.perfil = perfil;

    }

}
