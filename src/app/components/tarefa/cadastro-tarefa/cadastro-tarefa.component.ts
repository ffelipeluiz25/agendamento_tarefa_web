import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { SearchService } from "src/app/services/autocomplete.service";
import { UtilityService } from 'src/app/services/utility.service';
import { ApiService } from "src/app/services/api-service";
import { Component, OnInit } from "@angular/core";
import { Usuarios } from "src/app/model/usuario";
import { Observable, Subject, of } from 'rxjs';
import { Router } from '@angular/router';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cadastro-tarefa',
  templateUrl: './cadastro-tarefa.component.html',
  styleUrls: ['./cadastro-tarefa.component.css']
})

export class CadastroTarefaComponent implements OnInit {
  public model: any;
  public searchFailed = true;
  click$ = new Subject<string>();
  public usuarios: any;
  public dataInicio: any;
  public date: { year: number; month: number };
  public positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  public position = new FormControl(this.positionOptions[0]);

  constructor(private calendar: NgbCalendar, private router: Router, private utilService: UtilityService, private api: ApiService, private searchService: SearchService) { }

  async ngOnInit() {
    this.model = { dataInicio: '', dataInicioFormatada: '', usuario: '', usuarioId: 0, duracao: '' };
    await this.recuperaUsuarios();
  }

  clickCalendar() {
    var element: HTMLCollection;
    element = document.getElementsByClassName('dataNg');
    if (element[0].classList.contains('not-show'))
      element[0].classList.remove('not-show');
    else
      element[0].classList.add('not-show');
  }

  clickDataInicio() {
    var data = new Date(2023, this.dataInicio.month, this.dataInicio.day);
    this.model.dataInicio = data.toISOString();

    const yyyy = data.getFullYear();
    let mm = data.getMonth() + 1; // Months start at 0!
    let dd = data.getDate();
    let sdd: string;
    let smm: string;

    sdd = dd.toString();
    smm = mm.toString();

    if (dd < 10) sdd = '0' + dd;
    if (mm < 10) smm = '0' + mm;

    const formattedToday = sdd + '/' + smm + '/' + yyyy;
    this.model.dataInicioFormatada = formattedToday;
    this.clickCalendar();
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  async recuperaUsuarios() {
    await this.api.get('/usuario', {}, true, true).subscribe(result => {
      if (result.success)
        this.usuarios = result.data;
    });
  }

  voltar() {
    this.router.navigate(['/tarefa']);
  }

  async agendar() {
    await this.api.post('/tarefa/agendamento', this.model, true, true).subscribe({
      next: (result) => {
        if (result.success) {
          this.utilService.apresentaMensagem('Sucesso', 'Tarefa agendada com sucesso', 'success', '/tarefa');
        }
        else {
          this.utilService.apresentaMensagem('Warning', result.message, 'warning', '/tarefa');
        }
      }, error: (err) => {
        this.utilService.apresentaMensagem('Warning', 'Erro ao cadastrar tarefa!', 'warning', '/tarefa');
      }
    });
  }

  public search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => {
        return term.length < 2 ? [] :

          this.searchService.search(term, this.usuarios)
            .pipe(tap(() => (this.searchFailed = false)),
              catchError(() => of([])))
      })
    );
  formatter = (x: { name: string }) => x;

  selectItem(eve: any) {
    var nomeSplit = eve.item.split(' ');
    var usuario = this.usuarios.filter((user: Usuarios) =>
      user.nome.toLocaleLowerCase().includes(nomeSplit[0].toLocaleLowerCase())
      && user.sobrenome.toLocaleLowerCase().includes(nomeSplit[1].toLocaleLowerCase()));
    this.model.usuarioId = usuario[0].id;
  }
}