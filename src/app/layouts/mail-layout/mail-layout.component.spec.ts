import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailLayoutComponent } from './mail-layout.component';

describe('MailLayoutComponent', () => {
  let component: MailLayoutComponent;
  let fixture: ComponentFixture<MailLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
