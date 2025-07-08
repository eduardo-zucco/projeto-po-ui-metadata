import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { PoAccordionModule } from "@po-ui/ng-components";

@Component({
  selector: 'app-root',
  imports: [RouterModule, PoAccordionModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
