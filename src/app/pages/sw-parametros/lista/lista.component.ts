import { Component, OnInit } from '@angular/core';
import { PoBreadcrumb, PoBreadcrumbModule, PoDialogService, PoDynamicFormField, PoDynamicViewField, PoNotificationService, PoPageModule } from '@po-ui/ng-components';
import { PoPageDynamicTableActions, PoPageDynamicTableModule, PoPageDynamicSearchModule, PoPageDynamicSearchFilters, PoPageDynamicTableFilters } from '@po-ui/ng-templates';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicTableService } from '../../../services/DynamicTableService/dynamic-table.service';
import { HttpClient } from '@angular/common/http';
import { TratamentoDeErrosService } from '../../../services/tratamento-de-erros.service';


@Component({
  selector: 'app-lista',
  imports: [PoPageDynamicTableModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss'
})
export class ListaComponent {
  metadata: any;
  serviceApi: string = '';
  fields: PoDynamicViewField[] = [];

  constructor(private http: HttpClient,
    private errorHandler: TratamentoDeErrosService,
    private poNotification: PoNotificationService,
    private router: Router,
    private poDialog: PoDialogService) { }

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/home' },
      { label: 'Tabela de Parâmetros' },
    ]
  };

  actions = {
    new: '/sw_cadastro',
    //edit: '/editar/:id',
  };

  readonly customActions = [
    {
      label: 'Excluir',
      action: (item: any) => this.deleteItem(item),
      icon: 'an an-trash',
    },
    {
      label: 'Editar',
      action: (item: any) => this.editItem(item),
      icon: 'an an-pencil-line',
    },

  ];


  reloadTable() {
    window.location.reload();
  }

  public deleteItem(item: any): void {
    this.poDialog.confirm({
      title: 'Confirmação de Exclusão',
      message: `Tem certeza que deseja excluir o item "${item.chave}"?`,
      confirm: () => {
        this.http.delete(`http://localhost:5000/api/sw_parametros/${item.id}`).subscribe({
          next: () => {
            this.poNotification.success('Item excluído com sucesso!');
            this.reloadTable();
          },
          error: (error) => {
            this.poNotification.error('Erro ao excluir item.');
            this.errorHandler.mostraErro(error);
          }
        });
      },
      cancel: () => {
        this.poNotification.warning('Ação de exclusão cancelada.');
      }
    });
  }


  public editItem(item: any) {
    this.router.navigate(['/sw_editar', item.id])
  };


}
