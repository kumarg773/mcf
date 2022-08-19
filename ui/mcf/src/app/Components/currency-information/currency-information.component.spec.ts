import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyInformationComponent } from './currency-information.component';

describe('CurrencyInformationComponent', () => {
  let component: CurrencyInformationComponent;
  let fixture: ComponentFixture<CurrencyInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
