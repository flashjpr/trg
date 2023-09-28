import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapViewComponent } from './google-map-view.component';

describe('GoogleMapViewComponent', () => {
  let component: GoogleMapViewComponent;
  let fixture: ComponentFixture<GoogleMapViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoogleMapViewComponent],
    });
    fixture = TestBed.createComponent(GoogleMapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
