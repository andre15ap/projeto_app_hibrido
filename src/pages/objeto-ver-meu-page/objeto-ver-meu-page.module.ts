import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ObjetoVerMeuPage } from './objeto-ver-meu-page';

@NgModule({
  declarations: [
    ObjetoVerMeuPage,
  ],
  imports: [
    //IonicModule.forChild(ObjetoVerMeuPage),
  ],
  exports: [
    ObjetoVerMeuPage
  ]
})
export class ObjetoVerMeuPageModule {}
