import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DynamicTableService } from '../../../services/DynamicTableService/dynamic-table.service';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule, PoPageDynamicTableOptions } from "@po-ui/ng-templates";
import { HttpClient, HttpParams } from '@angular/common/http';
import { PoDialogService, PoNotificationService } from '@po-ui/ng-components';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TratamentoDeErrosService } from '../../../services/tratamento-de-erros.service';

@Component({
  selector: 'app-teste',
  imports: [CommonModule, PoPageDynamicTableModule],
  templateUrl: './teste.component.html',
  styleUrl: './teste.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TesteComponent {
  data: any;
  //fields: any [] = []
  options!: PoPageDynamicTableOptions


  constructor(private parametrosService: DynamicTableService, private http: HttpClient, private poNotification: PoNotificationService, private poDialog: PoDialogService, private router: Router, private errorHandler: TratamentoDeErrosService) { }

  actions = {
    new: '/sw_cadastro',
    delete: true
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
