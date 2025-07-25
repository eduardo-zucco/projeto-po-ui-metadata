import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { TabelaComponent } from './tabela/tabela.component';
import { EditarComponent } from './editar/editar.component';
import { ListaComponent } from './pages/sw-parametros/sw-tabela/lista.component';
import { SwCadastroComponent } from './pages/sw-parametros/sw-cadastro/sw-cadastro.component';
import { SwEditarComponent } from './pages/sw-parametros/sw-editar/sw-editar.component';
import { TesteComponent } from './pages/testes/teste/teste.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'search', component: SearchComponent },
  {
    path: 'tabela', component: TabelaComponent
  },
  { path: 'editar/:id', component: EditarComponent, },
  {
    path: 'lista', component: ListaComponent , data: {
      serviceApi: 'http://localhost:5000/api/sw_parametros',
      serviceMetadataApi: 'http://localhost:5000/api/metadata/sw_parametros'
    }
  },
  {
    path: 'sw_cadastro', component: SwCadastroComponent, data: {
      serviceApi: 'http://localhost:5000/api/sw_parametros',
      serviceMetadataApi: 'http://localhost:5000/api/metadata/sw_parametros'
    }
  },
  {
    path: 'sw_editar/:id', component: SwEditarComponent, data: {
      serviceApi: 'http://localhost:5000/api/sw_parametros',
      serviceMetadataApi: 'http://localhost:5000/api/metadata/sw_parametros',
      //serviceLoadApi: 'http://localhost:5000/api/metadata/sw_parametros/dynamic-options',
    }
  },
  {
    path: 'teste', component: TesteComponent, data: {
      serviceApi: 'http://localhost:5000/api/sw_parametros',
      serviceMetadataApi: 'http://localhost:5000/api/metadata/sw_parametros',
      //serviceLoadApi: 'http://localhost:5000/api/metadata/sw_parametros/dynamic-options',
    }
  },
];
