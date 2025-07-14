import { SearchComponent } from './../search/search.component';
import { Component } from '@angular/core';
import { PoPageModule, PoIconModule } from '@po-ui/ng-components';
import { PoMenuModule } from '@po-ui/ng-components';
import { PoToolbarModule, PoToolbarProfile, PoToolbarAction, PoContainerModule, PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-home',
  imports: [PoPageModule, PoToolbarModule, PoMenuModule, PoIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  collapsed: boolean = true;
  menus = [
    { label: 'Home', link: '/home', icon: 'an an-house-line' },
    { label: 'Cadastro', link: '/cadastro', icon: 'an an-book-open-text' },
    { label: 'Buscar', link: '/search', icon: 'po-icon-search' },
    { label: 'Tabela de Usuários', link: '/tabela', icon: 'an an-database' },
  ]

  toggleMenu() {
    this.collapsed = !this.collapsed
  };
  actions: Array<PoToolbarAction> = [
    {
      icon: 'po-icon-menu',
      action: () => this.toggleMenu(),
      label: 'Menu'
    }

  ];
}
