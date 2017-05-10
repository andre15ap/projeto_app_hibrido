import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DoadosPage } from './doados-page';

@NgModule({
  declarations: [
    DoadosPage,
  ],
  imports: [
    //IonicModule.forChild(DoadosPage),
  ],
  exports: [
    DoadosPage
  ]
})
export class DoadosPageModule {}
