import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdomainIndexPageComponent } from './subdomain-index-page.component';

describe('SubdomainIndexPageComponent', () => {
  let component: SubdomainIndexPageComponent;
  let fixture: ComponentFixture<SubdomainIndexPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubdomainIndexPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdomainIndexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
