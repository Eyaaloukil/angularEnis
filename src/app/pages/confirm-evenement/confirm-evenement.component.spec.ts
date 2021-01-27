import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEvenementComponent } from './confirm-evenement.component';

describe('ConfirmEvenementComponent', () => {
  let component: ConfirmEvenementComponent;
  let fixture: ComponentFixture<ConfirmEvenementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmEvenementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmEvenementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
