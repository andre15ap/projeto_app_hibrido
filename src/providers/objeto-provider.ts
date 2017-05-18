import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Objeto } from "../models/objeto";
import { LoginProvider } from "./login-provider";
import { NavController } from 'ionic-angular';
import { ObjetoAddImgPage } from '../pages/objeto-add-img-page/objeto-add-img-page';
import firebase from "firebase";




@Injectable()
export class ObjetoProvider {

	reference;

  constructor(public loginProvider : LoginProvider) {

    // console.log('entrou no provider objeto');

 	this.inicializar();

  }

  private inicializar(){
  	//this.reference = firebase.database().ref('/dadosUsuarios/'+this.loginProvider.usuarioAtual.uid+'/objetos/');
  	this.reference = firebase.database().ref('/objetos/');
  	// console.log('iniciou');
  }


 save(objeto:Objeto):any{ //e atualizar
 	let refKey;
 	if(objeto.ketReference != undefined){ //se ja existe referencia id
 		refKey =  objeto.ketReference; // a variavel refkey recebe esse id para atualizar
 	}else{
 		refKey = this.reference.push().key; // caso não exista id, então é um objeto novo, pega novo id
 		objeto.ketReference = refKey; //o objeto novo recebe o novo id gerado na linha de cima
 	}

	objeto.usuario = this.loginProvider.usuarioAtual.uid;
 	this.reference.child(refKey).update(objeto); //atualiza o objeto no firebase
	console.log('salvou objeto');
	return refKey;
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
