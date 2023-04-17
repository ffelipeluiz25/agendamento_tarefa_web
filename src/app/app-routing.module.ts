import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarefaComponent } from './components/tarefa/tarefa.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CadastroUsuarioComponent } from './components/usuario/cadastro-usuario/cadastro-usuario.component';
import { CadastroTarefaComponent } from './components/tarefa/cadastro-tarefa/cadastro-tarefa.component';

const routes: Routes = [
   { path: 'tarefa', component: TarefaComponent },
   { path: 'usuario', component: UsuarioComponent },
   { path: 'usuario/cadastro', component: CadastroUsuarioComponent },
   { path: 'tarefa/cadastro', component: CadastroTarefaComponent },
   { path: '', component: TarefaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
