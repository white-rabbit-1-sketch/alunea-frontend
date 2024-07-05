import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AliasIndexPageComponent } from './alias-index-page.component';

describe('AliasIndexPageComponent', () => {
  let component: AliasIndexPageComponent;
  let fixture: ComponentFixture<AliasIndexPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AliasIndexPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AliasIndexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
