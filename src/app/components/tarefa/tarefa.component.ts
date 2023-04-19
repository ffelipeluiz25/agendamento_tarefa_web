import { ModalArquivoComponent } from "./modal-arquivo/modal-arquivo.component";
import { SearchService } from "src/app/services/autocomplete.service";
import { UtilityService } from "src/app/services/utility.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "src/app/services/api-service";
import { Ng2SearchPipe } from "ng2-search-filter";
import { Router } from "@angular/router";

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})

export class TarefaComponent implements OnInit {
  @ViewChild('modalArquivo', { static: true }) modalArquivo: ModalArquivoComponent;
  public tarefas: any;
  public tarefas_filter: any;
  public model: any;
  public term = '';
  public page = 1;

  constructor(private utilService: UtilityService, private router: Router, private api: ApiService, private searchService: SearchService, private searchPipe: Ng2SearchPipe) { }
  async ngOnInit() {
    await this.recuperaTarefas();
  }

  anexarArquivo(tarefaId: number) {
    this.modalArquivo.open(tarefaId);
    return false;
  }

  closeArquivo() {
    this.recuperaTarefas();
  }

  async recuperaTarefas() {
    await this.api.get('/tarefa', {}, true, true).subscribe(result => {
      if (result.success)
        this.tarefas = result.data;

      this.applyFilter();
    });
  }

  applyFilter() {
    this.tarefas_filter = this.searchPipe.transform(this.tarefas, this.term.trim());
    this.page = 1;
  }

  keyUp() {
    this.recuperaTarefas();
  }

  criarAgendamento() {
    this.router.navigate(['/tarefa/cadastro']);
  }

  async statusEmAndamento(_usuarioId: number) {
    this.model = { usuarioId: _usuarioId, status: 1 };
    await this.api.post('/tarefa/atualiza-status', this.model, true, true).subscribe({
      next: (result) => {
        if (result.success) {
          this.utilService.apresentaMensagem('Sucesso', 'Tarefa esta em andamento com sucesso', 'success', '', false);
          this.recuperaTarefas();
        }
        else {
          this.utilService.apresentaMensagem('Warning', result.message, 'warning', '', false);
        }
      }, error: (err) => {
        this.utilService.apresentaMensagem('Warning', 'Erro ao cadastrar tarefa!', 'warning', '', false);
      }
    });
  }

  async statusFinalizarTarefa(_usuarioId: number) {
    this.model = { usuarioId: _usuarioId, status: 2 };
    await this.api.post('/tarefa/atualiza-status', this.model, true, true).subscribe({
      next: (result) => {
        if (result.success) {
          this.utilService.apresentaMensagem('Sucesso', 'Tarefa esta finalizada!', 'success', '', false);
          this.recuperaTarefas();
        }
        else {
          this.utilService.apresentaMensagem('Warning', result.message, 'warning', '', false);
        }
      }, error: (err) => {
        this.utilService.apresentaMensagem('Warning', 'Erro ao cadastrar tarefa!', 'warning', '', false);
      }
    });
  }

}