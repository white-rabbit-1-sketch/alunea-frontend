import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdomainListFeatureComponent } from './subdomain-list-feature.component';

describe('SubdomainListFeatureComponent', () => {
  let component: SubdomainListFeatureComponent;
  let fixture: ComponentFixture<SubdomainListFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubdomainListFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdomainListFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
