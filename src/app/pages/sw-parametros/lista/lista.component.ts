import { Component, OnInit, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoBreadcrumbModule, PoDialogService, PoDynamicFormField, PoDynamicViewField, PoModalComponent, PoNotificationService, PoPageModule, PoModalModule, PoDynamicModule } from '@po-ui/ng-components';
import { PoPageDynamicTableActions, PoPageDynamicTableModule, PoPageDynamicSearchModule, PoPageDynamicSearchFilters, PoPageDynamicTableFilters } from '@po-ui/ng-templates';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicTableService } from '../../../services/DynamicTableService/dynamic-table.service';
import { HttpClient } from '@angular/common/http';
import { TratamentoDeErrosService } from '../../../services/tratamento-de-erros.service';


@Component({
  selector: 'app-lista',
  imports: [PoPageDynamicTableModule, PoModalModule, PoDynamicModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss'
})
export class ListaComponent {
  @ViewChild('modalDetail', { static: true }) modalDetail!: PoModalComponent
  selectedItem: any = {};
  fieldsToDisplay: PoDynamicViewField[] = [];
  metadata: any;
  serviceApi: any;
  fields: PoDynamicViewField[] = [];

  constructor(private http: HttpClient,
    private errorHandler: TratamentoDeErrosService,
    private poNotification: PoNotificationService,
    private router: Router,
    private poDialog: PoDialogService,
  ) { }

  /*ngOnInit() {
    this.http.get('http://localhost:5000/api/sw_parametros/metadata?type=list&version=1')
      .subscribe(data => this.metadata = data);
  }*/

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/home' },
      { label: 'Tabela de Parâmetros' },
    ]
  };

  actions = {
    new: '/sw_cadastro',
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
    {
      label: 'Detalhes',
      action: (item: any) => this.showItemDetails(item),
      icon: 'po-icon-eye'
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

  showItemDetails = (item: any) => {
    this.selectedItem = item;

    if (this.metadata?.fields?.length) {
      this.fieldsToDisplay = this.metadata.fields;
    }
    else {
      this.fieldsToDisplay = Object.keys(item).map(key => ({
        property: key,
        label: this.formatarLabel(key)
      }));
    }

    this.modalDetail.open();
  }

  formatarLabel(key: string): string {
    return key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }


}
