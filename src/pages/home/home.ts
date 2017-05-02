import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ObjetoListPage  } from '../objeto-list-page/objeto-list-page';
//import { LoginPage } from '../login/login';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tab1Root: any =  ObjetoListPage;
  //tab2Root: any = LoginPage;


  constructor(public navCtrl: NavController) {

  }

}
