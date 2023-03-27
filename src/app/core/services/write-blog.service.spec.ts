import { TestBed } from '@angular/core/testing';

import { WriteBlogService } from './write-blog.service';

describe('WriteBlogService', () => {
  let service: WriteBlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WriteBlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
