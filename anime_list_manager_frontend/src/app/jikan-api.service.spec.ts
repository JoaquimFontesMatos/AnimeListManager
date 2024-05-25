import { TestBed } from '@angular/core/testing';

import { JikanApiService } from './jikan-api.service';

describe('JikanApiService', () => {
  let service: JikanApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JikanApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
