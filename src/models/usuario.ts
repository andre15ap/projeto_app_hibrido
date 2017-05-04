export class Usuario{
	id:any;
	email: string;
	nome: string;
	telefone: string;

	constructor(id?: any, nome?:string, email?: string, telefone?:string){
		this.id = id;
		this.nome = nome;
		this.email = email;
		this.telefone = telefone;
	}
}
