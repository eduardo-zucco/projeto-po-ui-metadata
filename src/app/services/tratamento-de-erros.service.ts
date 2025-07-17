import { Injectable } from '@angular/core';
import { PoNotificationService } from '@po-ui/ng-components';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TratamentoDeErrosService {

  constructor(private poNotification: PoNotificationService) { }

  public mostraErro(erro: HttpErrorResponse) {
    const userMsg = this.mapErroMsg(erro);
    this.poNotification.error(userMsg)

  }

  private mapErroMsg(erro: HttpErrorResponse): string {
    if (erro.error instanceof ErrorEvent) {
      return 'Erro de Rede. Verifique sua Conexão';
    }
    switch (erro.status) {
      case 400: return erro.error?.message || 'Dados inválidos.';
      case 401: return 'Sessão expirada. Por favor, faça login novamente.';
      case 404: return 'Dados não encontrados.';
      case 500: return 'Erro no servidor. Tente novamente mais tarde.';
      default: return erro.error?.message || `Erro desconhecido (${erro.status}).`;
    }
  }
}
