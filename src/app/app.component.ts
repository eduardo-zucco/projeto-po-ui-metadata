import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { PoAccordionModule } from "@po-ui/ng-components";
import { StartupService } from './services/startup.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule, PoAccordionModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {

  constructor(private router: Router, private startupService: StartupService) {}

  //ngOnInit() {
    //this.startupService.showMessage();
    //console.log('AppComponent inicializado.');
  //};
}
