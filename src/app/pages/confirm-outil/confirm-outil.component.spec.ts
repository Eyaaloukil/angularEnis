import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmOutilComponent } from './confirm-outil.component';

describe('ConfirmOutilComponent', () => {
  let component: ConfirmOutilComponent;
  let fixture: ComponentFixture<ConfirmOutilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmOutilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmOutilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
