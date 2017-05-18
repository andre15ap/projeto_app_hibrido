import { Injectable, ChangeDetectionStrategy } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import {Camera} from '@ionic-native/camera';
import {Objeto} from './../models/objeto'

import * as firebase from 'firebase';

/*
  Generated class for the CameraProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

declare var window: any;

@Injectable()


export class CameraProvider {
  public loading;
  assetCollection;
  objeto: Objeto = new Objeto();
  constructor(public http: Http,
              public loadingCtrl: LoadingController,
              private camera: Camera) {
    console.log('Hello CameraProvider Provider');
  }


  // carregaFoto() {
  //   var result;
  //
  //   return new Promise((resolve, reject) => {
  //     // carrega foto do firebase
  //     firebase.database().ref('assets').child(firebase.auth().currentUser.uid).once('value', (_snapshot: any) => {
  //         //mudar de cima para o id do objeto
  //       var element = _snapshot.val().URL;
  //       result = element;
  //
  //       resolve(result);
  //
  //       // callback(result);
  //     });
  //
  //   });
  // }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  pegaFoto(objeto:Objeto){
    this.objeto = objeto;
    //console.log(Device)
    var imageSource;

    this.loading = this.loadingCtrl.create({ // inicia o loading
      content: "Aguarde..."
    });


    return new Promise((resolve, reject) => {

      this.camera.getPicture({
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: this.camera.PictureSourceType.CAMERA,
        targetHeight: 640,
        correctOrientation: true
      }).then((_imagePath) => {
        this.loading.present();
        //alert('vai chamar o transforma blod '+_imagePath);
        // alert('Caminho do arquivo ' + _imagePath);
        // converte a imagem para blob(Blobs geralmente são objetos de imagem, áudio ou outro objetos multimedia)
        return this.transformarArqEmBlob(_imagePath);
      }).then((_imageBlob) => {
        // alert('Transforou em Blob ' + _imageBlob);

        // upa o blob
        //alert('vai upar firebase');
        return this.uploadParaFirebase(_imageBlob);
      }).then((_uploadSnapshot: any) => {
        // alert('Arquivo carregado com sucesso  ' + _uploadSnapshot.downloadURL);
        resolve(_uploadSnapshot.downloadURL);
        // armazena referencia para armazenar na base de dados
        return this.salvarParaAssetsDaBaseDeDados(_uploadSnapshot);

      }).then((_uploadSnapshot: any) => {
        alert('Objeto Salvo');
        this.loading.dismiss();
        // return this.assetCollection;
      }, (_error) => {
        alert('Erro ' + (_error.message || _error));
        //this.loading.dismiss();
        // return "erro";
      });

    });

  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  transformarArqEmBlob(_imagePath) {

    var caminho;

      caminho = '';


    // Instalar - cordova plugin add cordova-plugin-file
    return new Promise((resolve, reject) => {
      //window.resolveLocalFileSystemURL(caminho + _imagePath, (fileEntry) => { // se for imagem da biblioteca
      //alert('transformarArqEmBlob antes do window');
        window.resolveLocalFileSystemURL(_imagePath, (fileEntry) => {  // se for imagem tirada da camera
      //  alert(' transformarArqEmBlob depois do window');
        fileEntry.file((resFile) => {
          //alert('Entrou file entry');

          var reader = new FileReader();
          reader.onloadend = (evt: any) => {
            var imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg/jpg' });
            imgBlob.name = 'amostra.jpg';
            resolve(imgBlob);
          };

          reader.onerror = (e) => {
            console.log('Erro na leitura do arquivo: ' + e.toString());
            reject(e);
          };

          reader.readAsArrayBuffer(resFile);
        });
      });
    });
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  uploadParaFirebase(_imageBlob) {
    var fileName = 'img-' + new Date().getTime() + '.jpg';
    // var fileName = firebase.auth().currentUser.uid;
    var pasta = this.objeto.ketReference; //id do objeto
    //alert('entrou no upload firebase, nome pasta '+ pasta);
    return new Promise((resolve, reject) => {

      var fileRef = firebase.storage().ref('imagens/'+ pasta + '/' + fileName);

      var uploadTask = fileRef.put(_imageBlob);

      uploadTask.on('state_changed', (_snapshot) => {
        //console.log('snapshot progess ' + _snapshot);
      }, (_error) => {
        reject(_error);
      }, () => {
        // completion...
        resolve(uploadTask.snapshot);
      });
    });
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  salvarParaAssetsDaBaseDeDados(_uploadSnapshot) {
    var ref = firebase.database().ref('assets');

    return new Promise((resolve, reject) => {

      // vai salvar o meta data da imagem no banco de dados
      var dataToSave = {
        'URL': _uploadSnapshot.downloadURL, // url para acessar o arquivo
        'nome': _uploadSnapshot.metadata.name, // nome do arquivo
        'objeto': this.objeto.ketReference,
        'email': firebase.auth().currentUser.email,
        'ultimaAtualizacao': new Date().getTime(),
      };
      this.objeto.imagem = dataToSave.URL;
      firebase.database().ref('/objetos/').child(this.objeto.ketReference).update(this.objeto);
      ref.child(this.objeto.ketReference).set(dataToSave, (_response) => {
        resolve(_response);
      }).catch((_error) => {
        reject(_error);
      });

    });

  }


}
