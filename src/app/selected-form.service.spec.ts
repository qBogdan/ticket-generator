import { TestBed } from '@angular/core/testing';

import { SelectedFormService } from './selected-form.service';

describe('SelectedFormService', () => {
  let service: SelectedFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
