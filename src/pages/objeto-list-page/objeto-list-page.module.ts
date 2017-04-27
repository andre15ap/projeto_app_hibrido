import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ObjetoListPage } from './objeto-list-page';

@NgModule({
  declarations: [
    ObjetoListPage,
  ],
  imports: [
    //IonicModule.forChild(ObjetoListPage),
  ],
  exports: [
    ObjetoListPage
  ]
})
export class ObjetoListPageModule {}
