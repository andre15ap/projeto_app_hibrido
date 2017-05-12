import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RegistrarPage } from "../registrar/registrar";
import { ObjetoListPage } from "../objeto-list-page/objeto-list-page";
import { HomePage } from "../home/home";
import { LoginProvider } from "../../providers/login-provider";
import { Credencial } from "../../models/Credencial";
import { EmailValidator } from '../../validator/email';
import { FormBuilder, Validators } from '@angular/forms'

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

credencial:Credencial;
login: any = {};
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public loginProvider: LoginProvider,
              public loadingCtrl: LoadingController) {

      this.login = this.formBuilder.group({
     	email:['',Validators.compose([Validators.required, EmailValidator.isValid])],
     	senha:['',Validators.compose([Validators.minLength(6), Validators.required])]

     });
    this.credencial = new Credencial();
  }



  ionViewDidLoad() {
    //this.credencial = new Credencial();
    //console.log('ionViewDidLoad Login');
    this.loginProvider.loginSucesso.subscribe(
      user => this.navCtrl.push(HomePage) //pagina chamada se o login der certo
    )
    this.loginProvider.loginFalha.subscribe(

      error =>this.erro()

      )
  }



  loginComCredencial(){

    this.loginProvider.loginComCredencial(this.login.value);
    this.carregar();
  }

  loginComGoogle(){
    this.loginProvider.loginComGoogle();
    this.carregar();
  }

  loginComFacebook(){
    this.loginProvider.loginComFacebook();
    //this.carregar();
  }
  sair(){
    this.loginProvider.sair();
  }

  doRegistro(){ //sai do login e chama a pagina registrarpage
  	this.navCtrl.push(RegistrarPage);
  }

  carregar() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 2000
    });
    loader.present();
  }


  erro() {
    let loader = this.loadingCtrl.create({
      content: "email ou senha incorretos...",
      duration: 1000
    });
    loader.present();
  }
}
