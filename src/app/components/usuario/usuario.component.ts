import { Component, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "src/app/services/api-service";
import { Ng2SearchPipe } from "ng2-search-filter";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit {
    @ViewChild('usuarioForm', { static: true }) usuarioForm: NgForm;
    public usuarios: any;
    public usuarios_filter: any;
    public model: any;
    public term = '';
    public page = 1;
    public page_usuario = 'usuario';

    constructor(private router: Router, private api: ApiService, private searchPipe: Ng2SearchPipe) { }

    async ngOnInit() {
        this.model = { nome: '', sobrenome: '' };
        await this.recuperaUsuarios();
    }

    async recuperaUsuarios() {
        await this.api.get('/usuario', {}, true, true).subscribe(result => {
            if (result.success)
                this.usuarios = result.data;

            this.applyFilter();
        });
    }

    keyUp() {
        this.recuperaUsuarios();
    }

    applyFilter() {
        this.usuarios_filter = this.searchPipe.transform(this.usuarios, this.term.trim());
        this.page = 1;
    }

    adicionarUsuario() {
        this.router.navigate(['/usuario/cadastro']);
    }
}