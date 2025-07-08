import { Component } from '@angular/core';
import { PoPageModule } from '@po-ui/ng-components';
import { PoMenuModule } from '@po-ui/ng-components';
import { PoToolbarModule, PoToolbarProfile } from '@po-ui/ng-components';

@Component({
  selector: 'app-home',
  imports: [PoPageModule, PoToolbarModule, PoMenuModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
   menus = [
    {label: 'Home', link: '/home'},
    {label: 'Cadastro', link: '/cadastro'}
  ]

}
