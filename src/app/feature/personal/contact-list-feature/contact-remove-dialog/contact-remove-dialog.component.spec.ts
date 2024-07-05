import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactRemoveDialogComponent } from './contact-remove-dialog.component';

describe('ContactRemoveDialogComponent', () => {
  let component: ContactRemoveDialogComponent;
  let fixture: ComponentFixture<ContactRemoveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactRemoveDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactRemoveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
