import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { TabelaComponent } from './tabela/tabela.component';
import { EditarComponent } from './editar/editar.component';
import { ListaComponent } from './pages/sw-parametros/lista/lista.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent },
  {path: 'cadastro', component: CadastroComponent },
  {path: 'search', component: SearchComponent },
  {path: 'tabela', component: TabelaComponent},
  {path: 'editar/:id', component: EditarComponent,},
  {path: 'lista', component: ListaComponent,},
];
