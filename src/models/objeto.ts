import {ObjetoEstado} from "./objeto-estado";

export class Objeto {
	ketReference: number;
	titulo: string;
	descricao: string;
	estado: string;
	imagem: string;


constructor(id?: number, titulo?:string, descricao?: string, estado?:string, imagem?:string){
	this.ketReference = id;
	this.titulo = titulo;
	this.descricao = descricao;
	this.estado = estado;
	this.imagem = imagem;
}



}
