import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrangeinorderComponent } from './arrangeinorder.component';

describe('ArrangeinorderComponent', () => {
  let component: ArrangeinorderComponent;
  let fixture: ComponentFixture<ArrangeinorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrangeinorderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrangeinorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
