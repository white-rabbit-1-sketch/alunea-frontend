import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAddFeatureComponent } from './contact-add-feature.component';

describe('ContactAddFeatureComponent', () => {
  let component: ContactAddFeatureComponent;
  let fixture: ComponentFixture<ContactAddFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactAddFeatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactAddFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
