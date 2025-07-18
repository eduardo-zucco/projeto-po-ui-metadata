import { Injectable } from '@angular/core';
import { PoNotificationService } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  constructor(private poNotification: PoNotificationService) { }

  showMessage(): void {
    console.log('StartupService está ativo!');
    alert('StartupService inicializado com sucesso!');
    //this.poNotification.success('Serviço funcional!');
  }

}
