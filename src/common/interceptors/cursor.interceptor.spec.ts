import { TestBed } from '@angular/core/testing';

import { CursorInterceptor } from './cursor.interceptor';

describe('CursorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CursorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CursorInterceptor = TestBed.inject(CursorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
