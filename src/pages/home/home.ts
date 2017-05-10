import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ObjetoListPage  } from '../objeto-list-page/objeto-list-page';
import { ObjetoBuscarPage } from '../objeto-buscar-page/objeto-buscar-page';
import { DoadosPage } from '../doados-page/doados-page';
import { LoginProvider } from '../../providers/login-provider';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  tab1Root: any = ObjetoListPage;
  tab2Root: any = ObjetoBuscarPage;
  tab3Root: any = DoadosPage;


  constructor(public navCtrl: NavController,
              public loginProvider: LoginProvider) {

  }

}
