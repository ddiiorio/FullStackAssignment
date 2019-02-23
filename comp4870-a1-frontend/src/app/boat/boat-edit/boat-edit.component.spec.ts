import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatEditComponent } from './boat-edit.component';

describe('BoatEditComponent', () => {
  let component: BoatEditComponent;
  let fixture: ComponentFixture<BoatEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoatEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
