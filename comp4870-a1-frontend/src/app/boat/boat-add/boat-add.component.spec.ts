import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatAddComponent } from './boat-add.component';

describe('BoatAddComponent', () => {
  let component: BoatAddComponent;
  let fixture: ComponentFixture<BoatAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoatAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
