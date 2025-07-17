import { Component, OnInit, ViewChild } from '@angular/core';
import { PoPageDynamicEditModule, PoPageDynamicEditActions,  PoPageDynamicEditComponent, PoPageDynamicEditLiterals, PoPageDynamicEditField, PoPageDynamicEditOptions } from '@po-ui/ng-templates';
import { PoBreadcrumb, PoBreadcrumbModule, PoDynamicFormField, PoNotificationService, PoPageModule, PoFieldModule, PoButtonModule } from '@po-ui/ng-components';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { TratamentoDeErrosService } from '../services/tratamento-de-erros.service';
import { PoPageAction } from '@po-ui/ng-components';

@Component({
  selector: 'app-editar',
  imports: [PoBreadcrumbModule, PoPageDynamicEditModule, PoPageModule, ReactiveFormsModule, PoFieldModule, PoButtonModule ],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.scss'
})
export class EditarComponent implements OnInit {
  @ViewChild('dynamicEdit', { static: true })
  dynamicEdit!: PoPageDynamicEditComponent;
  id: string = ''
  userData: any = {};
  public readonly serviceApi = `http://localhost:5000/api/usercompletos`

 constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private poNotification: PoNotificationService,
    private errorHandler: TratamentoDeErrosService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }

  public readonly fields: PoPageDynamicEditField[] = [
    { property: 'id', label: 'ID', key: true, visible: false },
    { property: 'name',
      label: 'Nome',
      required: true,
      minLength: 4,
      maxLength: 100,
      gridColumns: 6,
      gridSmColumns: 12,
    },
    { property: 'email',
      label: 'E-mail',
      pattern: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
      required: true,
      gridColumns: 6,
      gridSmColumns: 12,
      errorMessage: 'Formato Inválido',
      maxLength: 150,
    },
    { property: 'uf',
      label: 'UF',
      minLength: 2,
      maxLength: 2,
      errorMessage: 'Formato inválido',
      gridColumns: 2,
      gridSmColumns: 12,
      pattern: '[A-Z]{2}',
      required: true
    },
    { property: 'municipio',
      label: 'Município',
      maxLength: 100,
      gridColumns: 6,
      gridSmColumns: 12,
      required: true
    },
    { property: 'cep',
      label: 'CEP',
      maxLength: 10,
      required: true,
      gridColumns: 4,
      gridSmColumns: 12,
      placeholder: '00000-000',
      pattern: '^[0-9]{5}-[0-9]{3}$',
      errorMessage: 'CEP inválido'
    }
  ];

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/home' },
      { label: 'Tabela', link: '/tabela' },
      { label: 'Editar' }
    ]
  };


  public readonly actions: PoPageDynamicEditActions = {
    cancel: '/tabela',
    save: '/tabela'
  };

  public readonly literals: PoPageDynamicEditLiterals = {
    pageActionCancel: 'Cancelar',
    pageActionSave: 'Salvar'
  };

  onSave(resource: any, id: string): void {
    this.http.put(`${this.serviceApi}/${this.id}`, resource).subscribe({
      next: () => {
        this.poNotification.success('Usuário salvo com sucesso!');
        this.router.navigate(['/tabela']);
      },
      error: (err) => { this.errorHandler.mostraErro(err)}
    });
  }
}
