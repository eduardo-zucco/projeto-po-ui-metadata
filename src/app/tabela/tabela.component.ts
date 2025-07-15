import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PoBreadcrumb, PoBreadcrumbModule, PoNotificationService, PoPageModule } from '@po-ui/ng-components';
import { PoPageDynamicTableActions, PoPageDynamicTableModule, PoPageDynamicSearchModule, PoPageDynamicSearchFilters, PoPageDynamicTableFilters } from '@po-ui/ng-templates';
import { CommonModule } from '@angular/common';
import { UserTableService } from '../services/user-table.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tabela',
  imports: [PoPageDynamicTableModule, PoPageModule, PoPageDynamicSearchModule],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.scss'
})
export class TabelaComponent {

  readonly serviceApi = 'http://localhost:5000/api/usercompletos';

  readonly filters: Array<PoPageDynamicSearchFilters> = [
    { property: 'name', label: 'Nome' },
    { property: 'email', label: 'E-mail' },
    { property: 'uf', label: 'UF' },
    { property: 'municipio', label: 'Município' },
    { property: 'cep', label: 'CEP' }
  ];

  public actions: PoPageDynamicTableActions = {
    new: '/cadastro',

  };


  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/home' }, { label: 'Tabela' }]
  };

  readonly fields: Array<PoPageDynamicTableFilters> = [
    { property: 'id', label: 'ID', key: true, visible: false },
    { property: 'name', label: 'Nome' },
    { property: 'email', label: 'E-mail' },
    { property: 'uf', label: 'UF' },
    { property: 'municipio', label: 'Município' },
    { property: 'cep', label: 'CEP' },
    { property: 'createAt', label: 'Criado Em' }
  ];
  constructor(private userTableService: UserTableService, private http: HttpClient, private poNotification: PoNotificationService, private router: Router) { }

  reloadTable() {
    window.location.reload();
  }

  public deleteUser(user: any) {
    if (confirm(`Tem Certeza que Deseja Excluir o Usuário "${user.name}"`)) {
      this.http.delete(`${this.serviceApi}/${user.id}`).subscribe({
        next: () => {
          this.poNotification.success("Usuário Excluido com Sucesso");
          this.reloadTable();
        },
        error: () => this.poNotification.error('Erro ao Excluir o Usuário')
      });
    }
  }

  public editarUsuario(user: any) {
    this.router.navigate(['/editar', user.id]);
  }


  readonly customActions = [
    {
      label: 'Excluir',
      action: (user: any) => this.deleteUser(user),
    },
    {
      label: 'Editar',
      action: (user: any)=> this.editarUsuario(user),
    }
  ];

}
