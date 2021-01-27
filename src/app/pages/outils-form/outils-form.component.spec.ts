import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutilsFormComponent } from './outils-form.component';

describe('OutilsFormComponent', () => {
  let component: OutilsFormComponent;
  let fixture: ComponentFixture<OutilsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutilsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutilsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
