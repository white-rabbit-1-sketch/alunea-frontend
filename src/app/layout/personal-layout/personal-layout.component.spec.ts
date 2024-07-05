import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalLayoutComponent } from './personal-layout.component';

describe('PersonalLayoutComponent', () => {
  let component: PersonalLayoutComponent;
  let fixture: ComponentFixture<PersonalLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
