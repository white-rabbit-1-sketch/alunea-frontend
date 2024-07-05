import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdomainRemoveDialogComponent } from './subdomain-remove-dialog.component';

describe('SubdomainRemoveDialogComponent', () => {
  let component: SubdomainRemoveDialogComponent;
  let fixture: ComponentFixture<SubdomainRemoveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubdomainRemoveDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubdomainRemoveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
