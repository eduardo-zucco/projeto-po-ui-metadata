import { Component, OnInit, ViewChild } from '@angular/core';
import { PoPageDynamicEditModule, PoPageDynamicEditActions, PoPageDynamicEditComponent, PoPageDynamicEditLiterals, PoPageDynamicEditField, PoPageDynamicEditOptions } from '@po-ui/ng-templates';
import { PoBreadcrumb, PoBreadcrumbModule, PoDynamicFormField, PoNotificationService, PoPageModule, PoFieldModule, PoButtonModule } from '@po-ui/ng-components';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-editar',
  imports: [PoBreadcrumbModule, PoPageDynamicEditModule, PoPageModule, ReactiveFormsModule, PoFieldModule, PoButtonModule],
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
    private poNotification: PoNotificationService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }

  public readonly fields: PoPageDynamicEditField[] = [
    { property: 'id', label: 'ID', key: true, visible: true },
    { property: 'name', label: 'Nome', required: true },
    { property: 'email', label: 'E-mail', required: true },
    { property: 'uf', label: 'UF' },
    { property: 'municipio', label: 'Município' },
    { property: 'cep', label: 'CEP' }
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
    save: this.save.bind(this)
  };

  public readonly literals: PoPageDynamicEditLiterals = {
    pageActionCancel: 'Cancelar',
    pageActionSave: 'Salvar'
  };

  save(resource: any, id: string): void {
    this.http.put(`${this.serviceApi}/${this.id}`, resource).subscribe({
      next: () => {
        this.poNotification.success('Usuário salvo com sucesso!');
        this.router.navigate(['/tabela']);
      },
      error: () => { this.poNotification.error('Erro ao salvar o usuário.')}
    });
  }

}
