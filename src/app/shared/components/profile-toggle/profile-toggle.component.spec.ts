import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileToggleComponent } from './profile-toggle.component';

describe('ProfileToggleComponent', () => {
  let component: ProfileToggleComponent;
  let fixture: ComponentFixture<ProfileToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileToggleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
