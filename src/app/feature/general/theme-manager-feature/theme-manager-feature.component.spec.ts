import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeManagerFeatureComponent } from './theme-manager-feature.component';

describe('ThemeManagerFeatureComponent', () => {
  let component: ThemeManagerFeatureComponent;
  let fixture: ComponentFixture<ThemeManagerFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeManagerFeatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThemeManagerFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
