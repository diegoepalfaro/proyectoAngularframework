import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCalzadoComponent } from './tabla-calzado.component';

describe('TablaCalzadoComponent', () => {
  let component: TablaCalzadoComponent;
  let fixture: ComponentFixture<TablaCalzadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaCalzadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaCalzadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
