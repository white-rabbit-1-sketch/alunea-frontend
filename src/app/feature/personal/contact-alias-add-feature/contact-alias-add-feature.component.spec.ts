import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAliasAddFeatureComponent } from './contact-alias-add-feature.component';

describe('ContactAliasAddFeatureComponent', () => {
  let component: ContactAliasAddFeatureComponent;
  let fixture: ComponentFixture<ContactAliasAddFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactAliasAddFeatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactAliasAddFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
