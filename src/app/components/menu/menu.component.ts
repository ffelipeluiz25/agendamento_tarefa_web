import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
    @Input() menuSelecionado: boolean;

    constructor(private router: Router) { }

    ngOnInit() {
        setTimeout(() => {
            if (this.menuSelecionado)
                this.usuariosNegrito();
            else
                this.tarefasNegrito();
        }, 100);
    }

    toggleMenu() {
        var ul: HTMLCollection;
        ul = document.getElementsByClassName('dropdown-menu');
        if (ul[0].classList.contains('show'))
            ul[0].classList.remove('show');
        else
            ul[0].classList.add('show');
    }

    tarefasNegrito() {
        //usuario
        var ulUsuario: HTMLCollection;
        ulUsuario = document.getElementsByClassName('menu-usuario');

        if (ulUsuario[0].classList.contains('active'))
            ulUsuario[0].classList.remove('active');

        //tarefa
        var ulTarefa: HTMLCollection;
        ulTarefa = document.getElementsByClassName('menu-tarefa');
        if (ulTarefa[0].classList.contains('active'))
            ulTarefa[0].classList.remove('active');

        ulTarefa[0].classList.add('active');
        this.router.navigate(['/tarefa']);
    }

    usuariosNegrito() {
        //tarefa
        var ulTarefa: HTMLCollection;
        ulTarefa = document.getElementsByClassName('menu-tarefa');
        if (ulTarefa[0].classList.contains('active'))
            ulTarefa[0].classList.remove('active');

        //usuario
        var ulUsuario: HTMLCollection;
        ulUsuario = document.getElementsByClassName('menu-usuario');
        if (ulUsuario[0].classList.contains('active'))
            ulUsuario[0].classList.remove('active');

        ulUsuario[0].classList.add('active');
        this.router.navigate(['/usuario']);
    }

    tarefas() {
        this.toggleMenu();
        this.router.navigate(['/tarefa']);
    }

    usuarios() {
        this.toggleMenu();
        this.router.navigate(['/usuario']);
    }
}