import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PoBreadcrumb, PoBreadcrumbModule, PoPageModule } from '@po-ui/ng-components';
import { PoPageDynamicTableActions, PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { CommonModule } from '@angular/common';
import { UserTableService } from '../services/user-table.service';


@Component({
  selector: 'app-tabela',
  imports: [PoPageDynamicTableModule, PoPageModule],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.scss'
})
export class TabelaComponent {

  readonly serviceApi = 'http://localhost:5000/api/usercompletos';

  public actions: PoPageDynamicTableActions = {
    new: '/cadastro',
    remove: true
  };


  readonly breadcrumb: PoBreadcrumb = {
    items: [{label: 'Home', link: '/home'}, {label: 'Tabela'}]
  };

  readonly fields: Array<object> = [
    {property: 'id', label: 'ID', key: true},
    {property:'name',label: 'Nome'},
    {property:'email',label: 'E-mail'},
    {property:'uf',label: 'UF'},
    {property:'municipio',label: 'Município'},
    {property:'cep',label: 'CEP'},
    {property: 'createAt', label: 'CreatedAt'}
  ];
  constructor (private userTableService: UserTableService){}
  getData = (params: any) => {
    return this.userTableService.getUsers(params);
  }
}
