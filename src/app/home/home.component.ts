import { Router } from '@angular/router';
import { SearchComponent } from './../search/search.component';
import { Component, OnInit } from '@angular/core';
import { PoPageModule, PoIconModule, PoWidgetModule, PoButtonModule, PoImageModule } from '@po-ui/ng-components';
import { PoMenuModule } from '@po-ui/ng-components';
import { PoToolbarModule, PoToolbarProfile, PoToolbarAction, PoContainerModule, PoMenuItem } from '@po-ui/ng-components';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [PoPageModule, PoToolbarModule, PoMenuModule, PoIconModule, PoWidgetModule, PoButtonModule, PoImageModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{
  public path: string = ''
  totalUsers: number = 0;
  constructor(private router: Router, private http: HttpClient) { }


  collapsed: boolean = true;
  menus = [
    { label: 'Home', link: '/home', icon: 'an an-house-line' },
    { label: 'Cadastro de Usuário', link: '/cadastro', icon: 'po-icon-user-add' },
    { label: 'Buscar Usuário', link: '/search', icon: 'po-icon-search' },
    { label: 'Tabela de Usuários', link: '/tabela', icon: 'po-icon-list' },
    { label: 'Tabela de Parâmetros', link: '/lista', icon: 'po-icon-list' },
  ]
  actions: Array<PoToolbarAction> = [
    {
      icon: 'po-icon-menu',
      action: () => this.toggleMenu(),
      label: 'Menu'
    }

  ];
  toggleMenu() {
    this.collapsed = !this.collapsed
  };
  goToCadastro() {
    this.router.navigate(['/cadastro'])
  };

  goToTabela() {
    this.router.navigate(['/tabela'])
  };

  goToParametrosTabela() {
    this.router.navigate(['/lista'])
  };

  goToSearch() {
    this.router.navigate(['/search'])
  };



}
