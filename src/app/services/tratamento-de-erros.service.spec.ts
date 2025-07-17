import { TestBed } from '@angular/core/testing';

import { TratamentoDeErrosService } from './tratamento-de-erros.service';

describe('TratamentoDeErrosService', () => {
  let service: TratamentoDeErrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TratamentoDeErrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
