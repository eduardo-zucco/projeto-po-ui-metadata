import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PoButtonModule, PoPageModule, PoDynamicModule, PoNotificationService, PoDynamicFormField, PoDynamicFormComponent, PoBreadcrumb } from "@po-ui/ng-components";
import { TratamentoDeErrosService } from '../../../services/tratamento-de-erros.service';

@Component({
  selector: 'app-login-cadastro',
  imports: [PoButtonModule, PoPageModule, PoDynamicModule, CommonModule],
  templateUrl: './login-cadastro.component.html',
  styleUrl: './login-cadastro.component.scss'
})
export class LoginCadastroComponent {

  @ViewChild(PoDynamicFormComponent, { static: true }) dynamicForm!: PoDynamicFormComponent;
  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/home' }, { label: 'Cadastro' }]
  };
  person = {};

  fields: Array<PoDynamicFormField> = [
    {
      property: 'name',
      label: 'Nome',
      divider: 'CADASTRO',
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

  ];
  constructor(private http: HttpClient, private router: Router, private errorHandler: TratamentoDeErrosService, private poNotification: PoNotificationService) {
  }

  onSubmit(formData: any) {
    this.http.post('http://localhost:5000/api/users', formData)
      .subscribe({
        next: () => {
          this.poNotification.success('Cadastro realizado com sucesso!');
          this.router.navigate(['/login'])
        },
        error: (erro) => {
          this.errorHandler.mostraErro(erro);
        }
      });
  }

  onCancel() {
    this.router.navigate(['/login'])
  };

  public get isFormInvalid(): boolean {
    return this.dynamicForm?.form?.invalid ?? false;
  };

}
