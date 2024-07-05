import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffFeatureComponent } from './tariff-feature.component';

describe('TariffComponent', () => {
  let component: TariffFeatureComponent;
  let fixture: ComponentFixture<TariffFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TariffFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TariffFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
