import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPedidosComponent } from './tabla-pedidos.component';

describe('TablaPedidosComponent', () => {
  let component: TablaPedidosComponent;
  let fixture: ComponentFixture<TablaPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaPedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
