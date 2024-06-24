import { TestBed } from '@angular/core/testing';

import { MangaStateService } from './manga-state.service';

describe('MangaStateService', () => {
  let service: MangaStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MangaStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
