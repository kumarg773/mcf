import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerPathComponent } from './server-path.component';

describe('ServerPathComponent', () => {
  let component: ServerPathComponent;
  let fixture: ComponentFixture<ServerPathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerPathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
