import { TestBed } from '@angular/core/testing';

import { AuthCheckLoggedInInterceptor } from './auth-check-logged-in.interceptor';

describe('AuthCheckLoggedInInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthCheckLoggedInInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthCheckLoggedInInterceptor = TestBed.inject(AuthCheckLoggedInInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
