import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactIndexPageComponent } from './contact-index-page.component';

describe('ContactIndexPageComponent', () => {
  let component: ContactIndexPageComponent;
  let fixture: ComponentFixture<ContactIndexPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactIndexPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactIndexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
