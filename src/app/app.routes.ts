import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { TabelaComponent } from './tabela/tabela.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent },
  {path: 'cadastro', component: CadastroComponent },
  {path: 'search', component: SearchComponent },
  {path: 'tabela', component: TabelaComponent},
];
