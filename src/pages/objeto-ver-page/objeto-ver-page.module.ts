import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ObjetoVerPage } from './objeto-ver-page';

@NgModule({
  declarations: [
    ObjetoVerPage,
  ],
  imports: [
    //IonicModule.forChild(ObjetoVerPage),
  ],
  exports: [
    ObjetoVerPage
  ]
})
export class ObjetoVerPageModule {}
