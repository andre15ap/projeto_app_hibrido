import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ObjetoBuscarPage } from './objeto-buscar-page';

@NgModule({
  declarations: [
    ObjetoBuscarPage,
  ],
  imports: [
    //IonicModule.forChild(ObjetoBuscarPage),
  ],
  exports: [
    ObjetoBuscarPage
  ]
})
export class ObjetoBuscarPageModule {}
