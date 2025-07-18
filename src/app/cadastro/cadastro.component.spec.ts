import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroComponent } from './cadastro.component';
import { PoDynamicModule, PoNotificationModule, PoPageModule, PoBreadcrumbModule, PoButtonModule } from '@po-ui/ng-components';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { TratamentoDeErrosService } from '../services/tratamento-de-erros.service';
import { PoNotificationService } from '@po-ui/ng-components';
import { of, throwError } from 'rxjs'; // Adicione este import
import { HttpErrorResponse } from '@angular/common/http';

fdescribe('CadastroComponent', () => {
  let component: CadastroComponent;
  let fixture: ComponentFixture<CadastroComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let poNotificationSpy: jasmine.SpyObj<PoNotificationService>;
  let errorHandlerSpy: jasmine.SpyObj<TratamentoDeErrosService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    poNotificationSpy = jasmine.createSpyObj('PoNotificationService', ['success']);
    errorHandlerSpy = jasmine.createSpyObj('TratamentoDeErrosService', ['mostraErro']);

    await TestBed.configureTestingModule({
      imports: [
        PoDynamicModule,
        PoNotificationModule,
        PoPageModule,
        PoBreadcrumbModule,
        PoButtonModule,
        HttpClientTestingModule
      ],
      declarations: [CadastroComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: PoNotificationService, useValue: poNotificationSpy },
        { provide: TratamentoDeErrosService, useValue: errorHandlerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call router.navigate on cancel', () => {
    component.onCancel();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should call poNotification.success on successful submit', () => {
    component.dynamicForm = { form: { reset: jasmine.createSpy('reset') } } as any;
    spyOn(component['http'], 'post').and.returnValue(of({}));

    component.onSubmit({ name: 'Teste' });
    expect(poNotificationSpy.success).toHaveBeenCalledWith('Cadastro realizado com sucesso!');
    expect(component.dynamicForm.form.reset).toHaveBeenCalled();
  });

  it('should call errorHandler.mostraErro on submit error', () => {
    const httpError = new HttpErrorResponse({ error: 'erro', status: 400 });
    spyOn(component['http'], 'post').and.returnValue(throwError(() => httpError));

    component.onSubmit({ name: 'Teste' });
    expect(errorHandlerSpy.mostraErro).toHaveBeenCalledWith(httpError);
  });

  it('should return true for isFormInvalid if form is invalid', () => {
    component.dynamicForm = { form: { invalid: true } } as any;
    expect(component.isFormInvalid).toBeTrue();
  });

  it('should return false for isFormInvalid if form is valid', () => {
    component.dynamicForm = { form: { invalid: false } } as any;
    expect(component.isFormInvalid).toBeFalse();
  });
});
