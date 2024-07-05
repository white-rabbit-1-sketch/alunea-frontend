import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashMessageFeatureComponent } from './flash-message-feature.component';

describe('FlashMessageFeatureComponent', () => {
  let component: FlashMessageFeatureComponent;
  let fixture: ComponentFixture<FlashMessageFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashMessageFeatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlashMessageFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
