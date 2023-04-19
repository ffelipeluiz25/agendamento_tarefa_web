import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './services/api-service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbCalendar, NgbCalendarHebrew, NgbDatepickerI18n, NgbDatepickerI18nHebrew, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TarefaComponent } from './components/tarefa/tarefa.component';
import { MenuComponent } from './components/menu/menu.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from './services/autocomplete.service';
import { UtilityService } from './services/utility.service';
import { FormValidationService } from './services/form-validation.service';
import { CadastroUsuarioComponent } from './components/usuario/cadastro-usuario/cadastro-usuario.component';
import { Ng2SearchPipeModule, Ng2SearchPipe } from 'ng2-search-filter';
import { CadastroTarefaComponent } from './components/tarefa/cadastro-tarefa/cadastro-tarefa.component';
import { ModalArquivoComponent } from './components/tarefa/modal-arquivo/modal-arquivo.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    TarefaComponent,
    MenuComponent,
    UsuarioComponent,
    CadastroUsuarioComponent,
    CadastroTarefaComponent,
    ModalArquivoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxFileDropModule,
    MatIconModule,
    MatTooltipModule
  ],
  providers:
    [
      ApiService,
      SearchService,
      UtilityService,
      Ng2SearchPipe,
      FormValidationService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }