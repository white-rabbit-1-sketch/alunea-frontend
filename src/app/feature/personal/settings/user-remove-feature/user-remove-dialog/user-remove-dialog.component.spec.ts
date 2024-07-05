import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRemoveDialogComponent } from './user-remove-dialog.component';

describe('UserRemoveDialogComponent', () => {
  let component: UserRemoveDialogComponent;
  let fixture: ComponentFixture<UserRemoveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRemoveDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserRemoveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
