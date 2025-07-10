import { SearchComponent } from './../search/search.component';
import { Component } from '@angular/core';
import { PoPageModule } from '@po-ui/ng-components';
import { PoMenuModule } from '@po-ui/ng-components';
import { PoToolbarModule, PoToolbarProfile, PoToolbarAction, PoContainerModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-home',
  imports: [PoPageModule, PoToolbarModule, PoMenuModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  collapsed = false;
  menus = [
    { label: 'Home', link: '/home', icon: 'an an-house-line' },
    { label: 'Cadastro', link: '/cadastro', icon: 'an an-book-open-text' },
    { label: 'Buscar', link: '/search', icon: 'po-icon-search' }
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
