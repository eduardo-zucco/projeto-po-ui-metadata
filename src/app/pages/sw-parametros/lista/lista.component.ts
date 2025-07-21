import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PoBreadcrumb, PoBreadcrumbModule, PoDynamicFormField, PoDynamicViewField, PoNotificationService, PoPageModule } from '@po-ui/ng-components';
import { PoPageDynamicTableActions, PoPageDynamicTableModule, PoPageDynamicSearchModule, PoPageDynamicSearchFilters, PoPageDynamicTableFilters } from '@po-ui/ng-templates';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicTableService } from '../../../services/DynamicTableService/dynamic-table.service';
import { PoMetadata, PoMetadataField } from '../../../interfaces/metadata/po-metadata-field';

@Component({
  selector: 'app-lista',
  imports: [PoPageDynamicTableModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss'
})
export class ListaComponent implements OnInit {
  metadata: any;
  serviceApi: string = '';
  fields: PoDynamicViewField[] = [];
  public readonly metadataApi = 'http://localhost:5000/api/metadatas/usercompletos';

  actions = {
    new: '/cadastro',
    edit: '/editar/:id',
    remove: true
  };

  constructor(private router: Router, private route: ActivatedRoute, private dynamicTableService: DynamicTableService, private http: HttpClient) { }


  ngOnInit(): void {
    this.http.get<any>('http://localhost:5000/api/Metadatas/usercompletos')
      .subscribe(metadata => {
        this.fields = metadata.fields;
        this.serviceApi = metadata.serviceApi;
      });
  }

}
