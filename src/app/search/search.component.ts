import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'
import {
  PoDynamicModule,
  PoDynamicViewField,
  PoPageModule,
  PoContainerModule,
  PoFieldModule,
  PoButtonModule,
  PoDividerModule,
  PoBreadcrumbModule,
  PoBreadcrumb,
} from '@po-ui/ng-components';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  imports: [PoDynamicModule,
    PoPageModule,
    PoContainerModule,
    PoFieldModule,
    FormsModule,
    PoButtonModule,
    PoDividerModule,
    CommonModule,
    PoBreadcrumbModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  readonly breadcrumb: PoBreadcrumb = {
      items: [{label: 'Home', link: '/home'}, {label: 'Buscar'}]
    };



  email: string = '';
  usuario: any = null;

  fields: Array<PoDynamicViewField> =
    [
      {
        property: 'name',
        label: 'Nome',
        gridColumns: 4,
        order: 1,
        container: 'INFORMAÇÕES PESSOAIS'
      },
      {
        property: 'email',
        label: 'E-mail',
        gridColumns: 4,
        order: 2
      },
      {
        property: 'uf',
        label: 'UF',
        gridColumns: 4,
        order: 3
      },
      {
        property: 'municipio',
        label: 'Município',
        gridColumns: 4,
        order: 4
      },
      {
        property: 'cep',
        label: 'CEP',
        gridColumns: 4,
        order: 5
      }
    ];

  constructor(private http: HttpClient) {}
  buscarUsuario() {
    if (!this.email) {
      alert('Digite um e-mail Válido e Cadastrado')
      return;
    }

    const url = `http://localhost:5000/api/usercompletos/by-email/${this.email}`;

    this.http.get(url).subscribe({
      next: (data) => {
        console.log('usuario recebido', data)
        this.usuario = data;
      },
      error: () => {
        this.usuario = null;
        alert('Usuário Não Encontrado');
      }
    });
  }
}
