import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwEditarComponent } from './sw-editar.component';

describe('SwEditarComponent', () => {
  let component: SwEditarComponent;
  let fixture: ComponentFixture<SwEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
