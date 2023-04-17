import { Injectable } from '@angular/core';
import { Observable, Observer, of } from 'rxjs';
import { Usuarios } from '../model/usuario';

@Injectable()
export class SearchService {
    public usuarios: string[] = [];

    constructor() { }

    search(term: string, _usuarios: Array<Usuarios>): Observable<string[]> {

        if (term === '') {
            return of([]);
        }

        var textoSplit = term.split(' ');
        let retorno: Observable<string[]> = of(['']);
        for (let index = 0; index < textoSplit.length; index++) {
            const texto = textoSplit[index];
            if (textoSplit[index] != "")
                retorno = this.buscaUsuarioTermo(texto, _usuarios);
        }
        return retorno;
    }

    buscaUsuarioTermo(texto: string, _usuarios: Array<Usuarios>): Observable<string[]> {
        let retorno: Observable<string[]> = of(['']);
        this.usuarios = [];
        let usuarios = _usuarios.filter((user: Usuarios) => user.nome.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) || user.sobrenome.toLocaleLowerCase().includes(texto.toLocaleLowerCase()));

        for (let index = 0; index < usuarios.length; index++) {
            const nomeCompleto = (usuarios[index].nome + ' ' + usuarios[index].sobrenome) as string;
            this.usuarios.push(nomeCompleto);
        }

        retorno = new Observable((observer: Observer<string[]>) => {
            observer.next(this.usuarios);
            observer.complete();
        });
        return retorno;
    }

}
