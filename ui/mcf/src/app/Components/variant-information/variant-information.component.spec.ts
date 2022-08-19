import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantInformationComponent } from './variant-information.component';

describe('VariantInformationComponent', () => {
  let component: VariantInformationComponent;
  let fixture: ComponentFixture<VariantInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariantInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
