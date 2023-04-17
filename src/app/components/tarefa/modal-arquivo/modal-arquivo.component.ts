import { Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api-service';
import { Ng2SearchPipe } from 'ng2-search-filter';
import { Observable, ReplaySubject } from 'rxjs';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-arquivo',
  templateUrl: './modal-arquivo.component.html',
  styleUrls: ['./modal-arquivo.component.css']
})

export class ModalArquivoComponent implements OnInit {

  @ViewChild('modalArquivo', { static: true }) modalArquivo: ElementRef;
  @Output('close-event') closeNotifyEvent: EventEmitter<any> = new EventEmitter<any>();

  ////////////////////////////////////////
  /////File zone
  ////////////////////////////////////////
  public files = [];
  public fileInputId: string;
  public invalidFormat: boolean;
  public dropfileText: string;
  public invalidFileSize: boolean;
  public validExtensions: Array<String>;
  public maxFileSize = 15728640; // 15mb
  public formData: FormData = new FormData();
  ////////////////////////////////////////
  public tarefaId: number;
  public modal: NgbModalRef;

  ////////////////////////////////////////
  //////////Tabela de dados
  ////////////////////////////////////////
  public arquivos: any;
  public arquivos_filter: any;
  public model: any;
  public term = '';
  public page = 1;

  constructor(private zone: NgZone, private searchPipe: Ng2SearchPipe, private api: ApiService, private modalService: NgbModal) { }

  async ngOnInit() {
    this.carregaTela();
  }

  async download(_arquivoId: Int32Array, _tarefaId: Int32Array) {
    this.model = { tarefaId: _tarefaId, arquivoId: _arquivoId };



    await this.api.post('/arquivo/download', this.model, true, true).subscribe({
      next: (result) => {
        if (!result.success) {
          return false;
        }
        else {
          const file = new File([result.data.json], result.data.name);
          saveAs(file, result.data.name);
          return true;
        }
      }, error: (err) => {
      }
    });
  }



  async recuperaArquivos() {
    await this.api.get('/arquivo', { tarefaId: this.tarefaId }, true, true).subscribe(result => {
      if (result.success)
        this.arquivos = result.data;

      this.applyFilter();
    });
  }

  applyFilter() {
    this.arquivos_filter = this.searchPipe.transform(this.arquivos, this.term.trim());
    this.page = 1;
  }

  async carregaTela() {
    this.dropfileText = 'Selecione os arquivos para anexar na tarefa';
    this.validExtensions = ['xls', 'XLS', 'xlsx', 'XLSX', 'csv', 'CSV', 'txt', 'TXT', 'pdf', 'PDF', ''];
    this.fileInputId = 'file_1';
    this.invalidFormat = false;
    this.invalidFileSize = false;
    this.formData = new FormData();
    this.files = [];
    if (this.tarefaId)
      await this.recuperaArquivos();
  }

  onSelectFile(target: any) {
    this.invalidFormat = false;
    this.invalidFileSize = false;
    this.files = [];
    for (const file of target.files) {
      this.addFile(file);
    }
  }

  addFile(file: File) {
    if (!this.isFormatValid(file.name)) {
      this.invalidFormat = true;
      this.updateDOM();
      return;
    }

    if (!this.isValidFileSize(file)) {
      this.invalidFileSize = true;
      this.updateDOM();
      return;
    }

    this.toBase64(file).subscribe(b64 => {
      const extension = file.name.split('.').pop();
      this.files.push({ name: file.name, b64: b64, extension: extension });
      this.dropfileText = file.name;
      this.formData = new FormData();
      this.formData.append("userpic", file, file.name + '$_$tarefaId$_$' + this.tarefaId);

      this.updateDOM();
    });
  }

  isValidFileSize(file: File) {
    if (file.size > this.maxFileSize) {
      return false;
    }
    return true;
  }

  isFormatValid(name: string) {
    let extension: string;
    if (name.indexOf('.') === -1) {
      extension = '';
    } else {
      extension = name.split('.').pop();
    }
    let isValid = this.validExtensions.includes(extension);
    return isValid;
  }

  updateDOM() {
    this.zone.run(() => { });
  }

  toBase64(fileToRead: File): Observable<FileReader> {
    const base64Observable = new ReplaySubject<any>(1);

    const fileReader = new FileReader();
    fileReader.onload = event => {
      base64Observable.next(fileReader.result);
    };

    fileReader.readAsDataURL(fileToRead);
    return base64Observable;
  }

  triggerFileInput(elemId: string) {
    (<HTMLInputElement>document.getElementById(elemId)).click();
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.invalidFormat = false;
    for (const file of files) {
      const fileEntry = file.fileEntry as FileSystemFileEntry;
      fileEntry.file(info => {
        this.addFile(info);
      });
    }
  }

  async open(_tarefaId: number) {
    this.tarefaId = _tarefaId;
    await this.carregaTela();
    this.modal = this.modalService.open(this.modalArquivo, { size: 'lg', backdropClass: 'fix-modal-backdrop-zindex', windowClass: 'fix-modal-zindex' });
    return false;
  }

  fechar() {
    this.modal.close();
  }

  salvar() {
    if (this.files.length == 0) {
      Swal.fire('Atenção', 'Selecione ao menos 1 arquivo no formato permitido', 'warning');
      return false;
    }

    this.api.post('/arquivo/updaload', this.formData, true, true).subscribe(result => {
      if (result.success) {
        this.closeNotifyEvent.emit();
        this.modal.close();

        Swal.fire('Sucesso', 'Arquivo adicionado a tarefa!', 'success');
      }
    });

    return true;
  }

}