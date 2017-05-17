import { Injectable, NgZone, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Credencial } from "../models/Credencial";
import { Usuario } from "../models/usuario";
import firebase from "firebase";
import { LoadingController} from 'ionic-angular';
import { LoginPage } from '../pages/login/login'


@Injectable()
export class LoginProvider {
	usuarioAtual: any;
	autenticado: boolean;
	loginSucesso: EventEmitter<any>; //para saber se logou com sucesso
	loginFalha:EventEmitter<any>; //para saber se teve erro no login
	logout:EventEmitter<any>;

	public perfilUsuario: any;

  constructor(public ngZone: NgZone,
							public loadingCtrl: LoadingController) { //ng zone é uma zona com o status
    console.log('Chamou o provider');

		this.loginSucesso  = new EventEmitter();
    this.loginFalha  = new EventEmitter();
    this.logout  = new EventEmitter();

    firebase.auth().onAuthStateChanged(usuario =>{ //pega o usuario atual
    this.verificaUsuario(usuario); // chamva o verifica usuario passando o usuario atual
		this.perfilUsuario = firebase.database().ref('/dadosUsuarios');
	})
  }

  private verificaUsuario(usuario){ //faz verificação de como esta o usuario
  	this.ngZone.run(() => {
  			if(usuario == null){
  				this.usuarioAtual = null;//nãõ esta autenticado no firebase
  				this.autenticado = false; //variavel autenticado rece null
  			}else{
  				this.usuarioAtual = usuario; //variavel recebe o usuario do firebase
  				this.autenticado = true; //variavel autentica = verdade para passar para home page
  			}
  		})
  	}


  	loginComCredencial(credencial:Credencial){
  		firebase.auth().signInWithEmailAndPassword(credencial.email, credencial.senha)
  		.then(resultado =>this.sucessoLogin(resultado))
  		.catch(error => this.falhaLogin(error));

  	}

  	loginComGoogle(){
  		let provider = new firebase.auth.GoogleAuthProvider();
  		firebase.auth().signInWithPopup(provider)
  		.then(resultado => this.sucessoLogin(resultado))
  		.catch(error => this.falhaLogin(error));
  	}

  	loginComFacebook(){
  		let provider = new firebase.auth.FacebookAuthProvider();
  		return firebase.auth().signInWithPopup(provider)
  		.then(resultado => this.sucessoLogin(resultado))
  		.catch(error => this.falhaLogin(error))
  	}


  registrarUsuario(usuario: Usuario, credencial: Credencial): firebase.Promise<any>{
  	return firebase.auth().createUserWithEmailAndPassword(credencial.email, credencial.senha)
		.then((newUser) => {
			this.perfilUsuario.child(newUser.uid).set({
				id: newUser.uid,
				nome: usuario.nome,
				email: credencial.email,
				telefone: usuario.telefone
			});
			this.loginComCredencial(credencial);
		})
  	.catch(error => console.log(" dados não foram "+error));

  }

  private sucessoLogin(response){
  	this.loginSucesso.emit(response.user);
  }

    private falhaLogin(error){
  	this.loginFalha.emit({code: error.code, massage: error.message, email: error.email, credencial: error.credencial});
  }

  sair(){

  	firebase.auth().signOut()
  	.then(() =>{
			this.logout.emit(true)
			this.autenticado = false;
			console.log('saindo');
		})
  	.catch(error => this.falhaLogin(error))
  }


}
