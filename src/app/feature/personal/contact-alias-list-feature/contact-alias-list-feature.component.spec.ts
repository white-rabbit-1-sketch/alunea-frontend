import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAliasListFeatureComponent } from './contact-alias-list-feature.component';

describe('ContactAliasListFeatureComponent', () => {
  let component: ContactAliasListFeatureComponent;
  let fixture: ComponentFixture<ContactAliasListFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactAliasListFeatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactAliasListFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
