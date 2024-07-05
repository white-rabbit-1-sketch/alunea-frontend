import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralHeaderComponent } from './general-header.component';

describe('PrimaryHeaderComponent', () => {
  let component: GeneralHeaderComponent;
  let fixture: ComponentFixture<GeneralHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
