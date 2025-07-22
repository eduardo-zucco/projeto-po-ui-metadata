import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoBreadcrumb, PoNotificationService } from '@po-ui/ng-components';
import { PoPageDynamicEditActions, PoPageDynamicEditField, PoPageDynamicEditModule } from '@po-ui/ng-templates';
import { TratamentoDeErrosService } from '../../../services/tratamento-de-erros.service';

@Component({
  selector: 'app-sw-editar',
  imports: [PoPageDynamicEditModule],
  templateUrl: './sw-editar.component.html',
  styleUrl: './sw-editar.component.scss'
})
export class SwEditarComponent {
  fields: PoPageDynamicEditField[] = [];
  serviceApi: string = ''

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/home' },
      { label: 'Tabela de Parâmetros', link: '/lista' },
      { label: 'Editar' }
    ]
  };

  public readonly actions: PoPageDynamicEditActions = {
    cancel: '/lista',
    save: '/lista'
  };

  constructor(private http: HttpClient, private poNotification: PoNotificationService, private router: Router, private errorHandler: TratamentoDeErrosService){}




}
