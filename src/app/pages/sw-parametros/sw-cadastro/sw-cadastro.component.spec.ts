import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwCadastroComponent } from './sw-cadastro.component';

describe('SwCadastroComponent', () => {
  let component: SwCadastroComponent;
  let fixture: ComponentFixture<SwCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwCadastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
