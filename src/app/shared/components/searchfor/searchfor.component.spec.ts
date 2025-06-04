import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchforComponent } from './searchfor.component';

describe('SearchforComponent', () => {
  let component: SearchforComponent;
  let fixture: ComponentFixture<SearchforComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchforComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
