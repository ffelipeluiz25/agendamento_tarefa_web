import { FormValidationService } from "src/app/services/form-validation.service";
import { UtilityService } from "src/app/services/utility.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "src/app/services/api-service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-cadastro-usuario',
    templateUrl: './cadastro-usuario.component.html',
    styleUrls: ['./cadastro-usuario.component.css']
})

export class CadastroUsuarioComponent implements OnInit {
    @ViewChild('usuarioForm', { static: true }) usuarioForm: NgForm;
    public model: any;
    public page_usuario = 'usuario';

    constructor(private router: Router, private utilService: UtilityService, private formValidator: FormValidationService, private api: ApiService) { }

    ngOnInit() {
        this.model = { nome: '', sobrenome: '' };
    }

    voltar() {
        this.router.navigate(['/usuario']);
    }

    cadastrar() {
        if (!this.usuarioForm.valid) {
            this.formValidator.markFormGroupTouched(this.usuarioForm.form);
        }
        else
            this.salvarUsuario();
    }

    salvarUsuario() {
        this.api.post('/usuario/criar', this.model, true, true).subscribe({
            next: (result) => {
                if (result.success) {
                    this.utilService.apresentaMensagem('Sucesso', 'Usuário cadastrado com sucesso', 'success', '/usuario');
                }
                else {
                    this.utilService.apresentaMensagem('Warning', result.message, 'warning', '/usuario');
                }
            }, error: (err) => {
                if (err.status == 409) {
                    this.utilService.apresentaMensagem('Warning', 'Usuário ja cadastrado!', 'warning', '/usuario');
                }
                else {
                    this.utilService.apresentaMensagem('Warning', 'Problema ao cadastrar usuário!', 'warning', '/usuario');
                }
            }
        });
    }
}