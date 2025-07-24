import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DynamicTableService } from '../../../services/DynamicTableService/dynamic-table.service';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule } from "@po-ui/ng-templates";
import { HttpClient } from '@angular/common/http';
import { PoNotificationService } from '@po-ui/ng-components';

@Component({
  selector: 'app-teste',
  imports: [CommonModule, PoPageDynamicTableModule],
  templateUrl: './teste.component.html',
  styleUrl: './teste.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TesteComponent implements OnInit {
  data: any;
  fields: any [] = []

  constructor(private parametrosService: DynamicTableService , private http: HttpClient, private poNotification: PoNotificationService) { }

  ngOnInit() {
    this.http.get<any>('http://localhost:5000/api/sw_parametros/metadata')
      .subscribe({
        next: metadata => {
          this.fields = metadata.fields
        },
        error: err => {
          this.poNotification.error('Erro ao carregar metadados.');
        }
      });
  }

}
