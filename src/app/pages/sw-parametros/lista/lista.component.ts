import { Component, OnInit, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoBreadcrumbModule, PoDialogService, PoDynamicFormField, PoDynamicViewField, PoModalComponent, PoNotificationService, PoPageModule, PoModalModule, PoDynamicModule, PoDialogModule } from '@po-ui/ng-components';
import { PoPageDynamicTableActions, PoPageDynamicTableModule, PoPageDynamicSearchModule, PoPageDynamicSearchFilters, PoPageDynamicTableFilters } from '@po-ui/ng-templates';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DynamicTableService } from '../../../services/DynamicTableService/dynamic-table.service';
import { HttpClient } from '@angular/common/http';
import { TratamentoDeErrosService } from '../../../services/tratamento-de-erros.service';
import { CommonModule, NgIf } from '@angular/common';


@Component({
  selector: 'app-lista',
  imports: [PoPageDynamicTableModule, PoModalModule, PoDynamicModule, CommonModule, PoDialogModule, PoBreadcrumbModule, RouterModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss'
})
export class ListaComponent implements OnInit {
  @ViewChild('modalDetail', { static: false }) modalDetail!: PoModalComponent
  selectedItem: any = {};
  fieldsToDisplay: PoDynamicViewField[] = [];
  fields: any[] = [];
  title: string = '';
  keepFilters = false;
  metadataReady = false;
  serviceApi: string = '';



  constructor(private http: HttpClient,
    private errorHandler: TratamentoDeErrosService,
    private poNotification: PoNotificationService,
    private router: Router,
    private poDialog: PoDialogService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:5000/api/metadata/sw_parametros')
      .subscribe({
        next: metadata => {
          this.fields = metadata.fields;
          this.title = metadata.title;
          this.serviceApi = metadata.serviceApi;
          this.keepFilters = metadata.keepFilters ?? false;
          this.metadataReady = true;
        },
        error: err => {
          this.poNotification.error('Erro ao carregar metadados.');
        }
      });
  }
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

    this.fieldsToDisplay = Object.keys(item).map(key => ({
      property: key,
      label: this.formatarLabel(key)
    }));
    this.modalDetail.open();
  }

  formatarLabel(key: string): string {
    return key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

}
