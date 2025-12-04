import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GravedadComponent } from './gravedad.component';

describe('GravedadComponent', () => {
  let component: GravedadComponent;
  let fixture: ComponentFixture<GravedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GravedadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GravedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
