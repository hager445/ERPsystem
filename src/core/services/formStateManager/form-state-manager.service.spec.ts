import { TestBed } from '@angular/core/testing';

import { FormStateMangerService } from './form-state-manager.service';

describe('FormStateMangerService', () => {
  let service: FormStateMangerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormStateMangerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
