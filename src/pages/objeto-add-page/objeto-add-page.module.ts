import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ObjetoAddPage } from './objeto-add-page';

@NgModule({
  declarations: [
    ObjetoAddPage,
  ],
  imports: [
    //IonicModule.forChild(ObjetoAddPage),
  ],
  exports: [
    ObjetoAddPage
  ]
})
export class ObjetoAddPageModule {}
