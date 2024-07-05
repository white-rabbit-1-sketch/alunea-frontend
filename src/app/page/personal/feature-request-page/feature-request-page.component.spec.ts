import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureRequestPageComponent } from './feature-request-page.component';

describe('FeatureRequestPageComponent', () => {
  let component: FeatureRequestPageComponent;
  let fixture: ComponentFixture<FeatureRequestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureRequestPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeatureRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
