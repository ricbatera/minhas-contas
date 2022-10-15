import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaDetalheComponent } from './entrada-detalhe.component';

describe('EntradaDetalheComponent', () => {
  let component: EntradaDetalheComponent;
  let fixture: ComponentFixture<EntradaDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntradaDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
