import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AliasRemoveDialogComponent } from './alias-remove-dialog.component';

describe('AliasRemoveDialogComponent', () => {
  let component: AliasRemoveDialogComponent;
  let fixture: ComponentFixture<AliasRemoveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AliasRemoveDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AliasRemoveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
