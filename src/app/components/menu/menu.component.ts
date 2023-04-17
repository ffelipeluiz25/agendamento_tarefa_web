import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

    constructor(private router: Router) { }
    ngOnInit(): void {
    }

    toggleMenu() {
        var ul: HTMLCollection;
        ul = document.getElementsByClassName('dropdown-menu');
        if (ul[0].classList.contains('show'))
            ul[0].classList.remove('show');
        else
            ul[0].classList.add('show');
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