import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { PoBreadcrumb, PoDynamicFormComponent, PoDynamicModule, PoNotificationModule, PoPageModule, PoBreadcrumbModule } from '@po-ui/ng-components';
import { Router } from '@angular/router';
import {
  PoDynamicFormField,
  PoDynamicFormFieldChanged,
  PoDynamicFormValidation,
  PoNotificationService,
  ForceBooleanComponentEnum,
  PoButtonModule
} from '@po-ui/ng-components';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TratamentoDeErrosService } from '../services/tratamento-de-erros.service';

@Component({
  selector: 'app-cadastro',
  imports: [PoDynamicModule, PoButtonModule, PoNotificationModule, PoPageModule, PoBreadcrumbModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  @ViewChild(PoDynamicFormComponent, { static: true }) dynamicForm!: PoDynamicFormComponent;
  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/home' }, { label: 'Cadastro' }]
  };
  person = {};

  fields: Array<PoDynamicFormField> = [
    {
      property: 'name',
      label: 'Nome',
      divider: 'CADASTRO DE USUÁRIO',
      required: true,
      minLength: 4,
      maxLength: 100,
      gridColumns: 6,
      gridSmColumns: 12,
      order: 1,
      placeholder: 'Digite Seu Nome'
    },
    {
      property: 'email',
      label: 'E-mail',
      required: true,
      pattern: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
      maxLength: 150,
      gridColumns: 6,
      gridSmColumns: 12,
      order: 2,
      errorMessage: 'Formato Inválido',
      placeholder: 'seu@email.com'
    },
    {
      property: 'Uf',
      label: 'UF',
      maxLength: 2,
      minLength: 2,
      required: true,
      gridColumns: 2,
      gridSmColumns: 12,
      order: 3,
      pattern: '[A-Z]{2}',
      errorMessage: 'Formato Inválido',
      placeholder: 'SP, RJ, MG...'
    },
    {
      property: 'Municipio',
      label: 'Município',
      maxLength: 100,
      required: true,
      gridColumns: 6,
      gridSmColumns: 12,
      order: 4,
      placeholder: 'Informe a Cidade'
    },
    {
      property: 'Cep',
      label: 'CEP',
      maxLength: 10,
      required: true,
      gridColumns: 4,
      gridSmColumns: 12,
      order: 5,
      placeholder: '00000-000',
      pattern: '^[0-9]{5}-[0-9]{3}$',
      errorMessage: 'CEP Inválido'
    },

  ];
  constructor(private http: HttpClient, private router: Router, private errorHandler: TratamentoDeErrosService) {
  }

  onSubmit(formData: any) {
    this.http.post('http://localhost:5000/api/usercompletos', formData)
      .subscribe({
        next: () => {
          alert('Cadastro realizado com sucesso!');
          this.dynamicForm.form.reset()
        },
        error: (err) => {
          this.errorHandler.mostraErro(err);
        }
      });
  }

  onCancel() {
    this.router.navigate(['/home'])
  };

  public get isFormInvalid(): boolean {
    return this.dynamicForm?.form?.invalid ?? false;
  };

  actions = {
    submit: 'Salvar',
    cancel: this.onCancel.bind(this)
  };



}
