import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Objeto } from "../../models/objeto"
import { Usuario  } from "../../models/usuario"
import firebase from "firebase";
//import { AngularFire } from 'angularfire2';


@IonicPage()
@Component({
  selector: 'page-objeto-ver-page',
  templateUrl: 'objeto-ver-page.html',
})
export class ObjetoVerPage {

  objeto: Objeto;
  objetos: Array<Objeto>;
  teste: string = "nome teste";
  usuario: Usuario;

//  ob: FirebaseObjectObservable<any>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ngZone: NgZone) {

    this.objeto = this.navParams.get('objeto');
    this.objetos = new Array<Objeto>();
    console.log('entrou no ver');
    this.usuario = new Usuario();
  }


  ionViewWillEnter() {
        this.objeto = this.navParams.get('objeto');
        firebase.database().ref('/dadosUsuarios/' + this.objeto.usuario).once('value', (snapshot)=> {
        console.log(snapshot.val());

        this.usuario.nome = snapshot.val().nome;
        this.usuario.telefone = snapshot.val().telefone;
        this.usuario.email = snapshot.val().email;
        console.log(this.usuario.nome);

    });
  }


}
