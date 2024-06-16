import { TestBed } from '@angular/core/testing';

import { MangaServiceService } from './manga-service.service';

describe('MangaServiceService', () => {
  let service: MangaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MangaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
