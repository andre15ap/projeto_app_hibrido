import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginProvider } from "../../providers/login-provider";

import { Credencial } from "../../models/Credencial";

@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {
	credencial:Credencial;

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  public loginProvider: LoginProvider) {
  	
  	this.credencial = new Credencial();
  }

  doRegister(){
  	this.loginProvider.registrarUsuario(this.credencial);
  }

}
