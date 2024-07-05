import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsIndexPageComponent } from './settings-index-page.component';

describe('SettingsIndexPageComponent', () => {
  let component: SettingsIndexPageComponent;
  let fixture: ComponentFixture<SettingsIndexPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsIndexPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingsIndexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
