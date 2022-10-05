import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaEntradaComponent } from './nova-entrada.component';

describe('NovaEntradaComponent', () => {
  let component: NovaEntradaComponent;
  let fixture: ComponentFixture<NovaEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovaEntradaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
