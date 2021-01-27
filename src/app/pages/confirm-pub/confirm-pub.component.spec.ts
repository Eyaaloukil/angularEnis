import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPubComponent } from './confirm-pub.component';

describe('ConfirmPubComponent', () => {
  let component: ConfirmPubComponent;
  let fixture: ComponentFixture<ConfirmPubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmPubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
