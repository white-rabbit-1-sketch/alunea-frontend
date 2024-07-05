import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSelectorFeatureComponent } from './language-selector-feature.component';

describe('LanguageSelectorFeatureComponent', () => {
  let component: LanguageSelectorFeatureComponent;
  let fixture: ComponentFixture<LanguageSelectorFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageSelectorFeatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LanguageSelectorFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
