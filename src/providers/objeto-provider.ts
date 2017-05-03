import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Objeto } from "../models/objeto";
import { LoginProvider } from "./login-provider";
import firebase from "firebase";




@Injectable()
export class ObjetoProvider {

	reference;

  constructor(public loginProvider : LoginProvider) {

    console.log('entrou no provider objeto');

 	this.inicializar();

  }

  private inicializar(){
  	this.reference = firebase.database().ref('/dadosUsuarios/'+this.loginProvider.usuarioAtual.uid+'/objetos/');
  	console.log('iniciou');
  }


 save(objeto:Objeto){ //e atualizar
 	let refKey;
 	if(objeto.ketReference != undefined){ //se ja existe referencia id
 		refKey =  objeto.ketReference; // a variavel refkey recebe esse id para atualizar
 	}else{
 		refKey = this.reference.push().key; // caso não exista id, então é um objeto novo, pega novo id
 		objeto.ketReference = refKey; //o objeto novo recebe o novo id gerado na linha de cima
 	}

 	this.reference.child(refKey).update(objeto); //atualiza o objeto no firebase
 }

 //  save(objeto:Objeto): firebase.Promise<any>{ //pode usar esse e depois o atualizar
 // 	return this.reference.push({
 //        titulo: objeto.titulo,
 //        descricao: objeto.descricao,
 //        estado: objeto.estado
 //      });
 // }

 deletar(objeto:Objeto):any{
 	return this.reference.child(objeto.ketReference).remove(); //remove o objeto no firebase
 }

  adicionar(objeto:Objeto){

  }

}
