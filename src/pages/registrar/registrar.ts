import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginProvider } from "../../providers/login-provider";

import { Credencial } from "../../models/Credencial";
import { Usuario } from "../../models/usuario";

@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {
	credencial:Credencial;
  usuario: Usuario;

  constructor(public navCtrl: NavController,
  			  public navParams: NavParams,
  			  public loginProvider: LoginProvider) {

  	this.credencial = new Credencial();
    this.usuario = new Usuario();
  }

  doRegister(){
  	this.loginProvider.registrarUsuario(this.usuario, this.credencial);
  }

}
