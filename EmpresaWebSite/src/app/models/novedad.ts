import { Usuario } from './usuario';

export class Novedad {
    id: number;
    usuario: Usuario;
    texto: string;
    fechaMsj: Date;
    estado: string;

    constructor(id?: number, usuario?: Usuario, texto?: string, fechaMsj?: Date, estado?: string) {
        this.id = id;
        this.usuario = usuario;
        this.texto = texto;
        this.fechaMsj = fechaMsj;
        this.estado = estado;

    }

}
