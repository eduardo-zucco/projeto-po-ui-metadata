import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { PoDynamicFormComponent, PoDynamicModule, PoNotificationModule } from '@po-ui/ng-components';
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

@Component({
  selector: 'app-cadastro',
  imports: [PoDynamicModule, PoButtonModule, PoNotificationModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  @ViewChild(PoDynamicFormComponent, {static: true}) dynamicForm!: PoDynamicFormComponent;
  person = {};
  validateFields: Array<string> = ['state'];

  fields: Array<PoDynamicFormField> = [
    {
      property: 'name',
      divider: 'USER NAME',
      required: true,
      minLength: 4,
      maxLength: 50,
      gridColumns: 6,
      gridSmColumns: 12,
      order: 1,
      placeholder: 'Type your name'
    },
    {
      property: 'email',
      divider: 'CONTACTS',
      gridColumns: 6,
      icon: 'an an-envelope',
      placeholder: 'Type your e-mail'
    },
  ];
  constructor(private http: HttpClient, private router: Router) {
  }

  onSubmit(formData: any) {
    this.http.post('http://localhost:5000/api/users', formData)
      .subscribe({
        next: () => {
          alert('Cadastro realizado com sucesso!');
          this.router.navigate(['/endereco']);
        },
        error: (err) => {
          alert('Erro ao cadastrar: ' + (err.error?.message || 'erro desconhecido'));
        }
      });
  }
  actions = {
    submit: 'Salvar'
  };



}
