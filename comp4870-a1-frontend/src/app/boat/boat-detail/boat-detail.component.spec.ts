import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatDetailComponent } from './boat-detail.component';

describe('BoatDetailComponent', () => {
  let component: BoatDetailComponent;
  let fixture: ComponentFixture<BoatDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoatDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
