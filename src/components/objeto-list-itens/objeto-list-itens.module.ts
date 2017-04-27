import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ObjetoListItens } from './objeto-list-itens';

@NgModule({
  declarations: [
    ObjetoListItens,
  ],
  imports: [
    //IonicModule.forChild(ObjetoListItens),
  ],
  exports: [
    ObjetoListItens
  ]
})
export class ObjetoListItensModule {}
