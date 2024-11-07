import { TestBed } from '@angular/core/testing';

import { CapitoliService } from './capitoli.service';

describe('CapitoliService', () => {
  let service: CapitoliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapitoliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
