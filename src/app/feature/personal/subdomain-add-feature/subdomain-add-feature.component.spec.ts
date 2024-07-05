import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdomainAddFeatureComponent } from './subdomain-add-feature.component';

describe('SubdomainAddFeatureComponent', () => {
  let component: SubdomainAddFeatureComponent;
  let fixture: ComponentFixture<SubdomainAddFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubdomainAddFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdomainAddFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
