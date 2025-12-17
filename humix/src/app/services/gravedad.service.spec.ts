import { TestBed } from '@angular/core/testing';

import { GravedadService } from './gravedad.service';

describe('GravedadService', () => {
  let service: GravedadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GravedadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
