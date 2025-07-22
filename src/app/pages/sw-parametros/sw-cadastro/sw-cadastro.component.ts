import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoDynamicFormComponent, PoDynamicFormField, PoDynamicModule, PoDynamicViewField, PoNotificationService, PoPageModule, PoButtonModule, PoBreadcrumb } from '@po-ui/ng-components';
import { CommonModule, NgIf } from '@angular/common';
import { TratamentoDeErrosService } from '../../../services/tratamento-de-erros.service';

@Component({
  selector: 'app-sw-cadastro',
  imports: [PoDynamicModule, PoPageModule, PoButtonModule],
  templateUrl: './sw-cadastro.component.html',
  styleUrl: './sw-cadastro.component.scss'
})
export class SwCadastroComponent implements OnInit {
  @ViewChild(PoDynamicFormComponent, { static: true }) dynamicForm!: PoDynamicFormComponent;

  metadata = '';
  serviceApi: string = '';
  fields: PoDynamicFormField[] = [];

  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private poNotification: PoNotificationService,
    private errorHandler: TratamentoDeErrosService,
    private router: Router
  ) { }

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/home' },
      { label: 'Tabela de Parâmetros', link: '/lista' },
      { label: 'Novo' },
    ]
  };

  ngOnInit(): void {
    const data = this.route.snapshot.data;
    this.metadata = data?.['serviceMetadataApi'];
    this.serviceApi = data?.['serviceApi'];
    if (this.metadata) {
      this.http.get<any>(this.metadata).subscribe({
        next: (data) => {
          console.log('usuario recebido', data)
          this.fields = data.fields;
        }

      })
    }

  }


  onSubmit(formData: any) {
    this.http.post(this.serviceApi, formData)
      .subscribe({
        next: () => {
          this.poNotification.success('Cadastro realizado com sucesso!');
          this.dynamicForm.form.reset();
        },
        error: (erro) => {
          this.errorHandler.mostraErro(erro);
        },
      });
  }

  onCancel(){
    this.router.navigate(['/lista'])
  }


}






