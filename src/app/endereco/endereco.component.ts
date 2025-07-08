import { Component, ViewChild } from '@angular/core';
import { PoDynamicFormComponent, PoDynamicModule, PoNotificationModule, PoDynamicFormField, PoButtonModule } from '@po-ui/ng-components';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-endereco',
  imports: [PoDynamicModule, PoButtonModule, PoNotificationModule],
  templateUrl: './endereco.component.html',
  styleUrl: './endereco.component.scss'
})
export class EnderecoComponent {

}
