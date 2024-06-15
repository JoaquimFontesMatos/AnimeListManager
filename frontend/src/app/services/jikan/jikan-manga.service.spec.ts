import { TestBed } from '@angular/core/testing';

import { JikanMangaService } from './jikan-manga.service';

describe('JikanMangaService', () => {
  let service: JikanMangaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JikanMangaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
