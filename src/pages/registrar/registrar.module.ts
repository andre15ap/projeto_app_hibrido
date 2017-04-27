import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { RegistrarPage } from './registrar';

@NgModule({
  declarations: [
    RegistrarPage,
  ],
  imports: [
    //IonicModule.forChild(RegistrarPage),
  ],
  exports: [
    RegistrarPage
  ]
})
export class RegistrarModule {}
