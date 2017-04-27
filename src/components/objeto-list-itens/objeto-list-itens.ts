import { Component, Input} from '@angular/core';
import { Objeto } from "../../models/objeto"

@Component({
  selector: 'objeto-list-itens',
  templateUrl: 'objeto-list-itens.html'
})
export class ObjetoListItens {
	
	@Input()	
	objeto:Objeto;
}
