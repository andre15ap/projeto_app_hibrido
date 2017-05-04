import {ObjetoEstado} from "./objeto-estado";

export class Objeto {
	ketReference: any;
	usuario: any;
	titulo: string;
	descricao: string;
	estado: string;
	//imagem: string;


constructor(id?: any, titulo?:string, descricao?: string, estado?:string, usuario?:string){
	this.ketReference = id;
	this.titulo = titulo;
	this.descricao = descricao;
	this.estado = estado;
  this.usuario = usuario;
	//this.imagem = imagem;
}



}
