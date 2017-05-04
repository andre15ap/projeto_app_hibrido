import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Objeto } from "../../models/objeto"
import { Usuario  } from "../../models/usuario"
import firebase from "firebase";


@IonicPage()
@Component({
  selector: 'page-objeto-ver-page',
  templateUrl: 'objeto-ver-page.html',
})
export class ObjetoVerPage {

  objeto: Objeto;
  objetos: Array<Objeto>;
  teste :string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ngZone: NgZone) {

    this.objeto = this.navParams.get('objeto');
    this.objetos = new Array<Objeto>();
    console.log('entrou no ver');
    //this.verUsuario();

  }

  ionViewDidLoad() {
    this.objeto = this.navParams.get('objeto');

      return firebase.database().ref('/dadosUsuarios/' + this.objeto.usuario).once('value').then(function(snapshot) {

      var nome = snapshot.val().nome;
       let tel = snapshot.val().telefone;
       let email = snapshot.val().email;
       let id = snapshot.key;
      //this.usario.id = snapshot.key;
      //this.usuario.email = snapshot.val().email;
      //this.usuario.telefone = snapshot.val().telefone;

       console.log(nome+' '+tel+' '+email+" "+id);
      // this.nome.push(nome);
      //  if(nome instanceof Object){
      //    console.log('objeto é');
      //  }else{
      //    console.log('não é objeto');
      //  }


    });
  }


}
