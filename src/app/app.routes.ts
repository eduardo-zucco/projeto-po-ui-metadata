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
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { LoginCadastroComponent } from './pages/login/login-cadastro/login-cadastro.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'loginCadastro', component: LoginCadastroComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'cadastro', component: CadastroComponent, canActivate: [authGuard] },
  { path: 'search', component: SearchComponent, canActivate: [authGuard] },
  {
    path: 'tabela', component: TabelaComponent, canActivate: [authGuard]
  },
  { path: 'editar/:id', component: EditarComponent, canActivate: [authGuard] },
  {
    path: 'lista', component: ListaComponent, canActivate: [authGuard], data: {
      serviceApi: 'http://localhost:5000/api/sw_parametros',
      serviceMetadataApi: 'http://localhost:5000/api/metadata/sw_parametros'
    }
  },
  {
    path: 'sw_cadastro', canActivate: [authGuard] ,component: SwCadastroComponent, data: {
      serviceApi: 'http://localhost:5000/api/sw_parametros',
      serviceMetadataApi: 'http://localhost:5000/api/metadata/sw_parametros'
    }
  },
  {
    path: 'sw_editar/:id',  component: SwEditarComponent, canActivate: [authGuard], data: {
      serviceApi: 'http://localhost:5000/api/sw_parametros',
      serviceMetadataApi: 'http://localhost:5000/api/metadata/sw_parametros',
      //serviceLoadApi: 'http://localhost:5000/api/metadata/sw_parametros/dynamic-options',
    }
  },

];
