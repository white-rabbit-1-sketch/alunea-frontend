import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListFeatureComponent } from './contact-list-feature.component';

describe('ContactListFeatureComponent', () => {
  let component: ContactListFeatureComponent;
  let fixture: ComponentFixture<ContactListFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactListFeatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactListFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
