import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  // Check for the custom header to skip the interceptor
  if (req.headers.has('X-Skip-Interceptor')) {
    // Remove the custom header before passing the request to the next handler
    const clonedRequest = req.clone({
      headers: req.headers.delete('X-Skip-Interceptor'),
    });
    return next(clonedRequest);
  }

  // Otherwise, apply the usual token logic
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  if (currentUser && currentUser.token) {
    const clonedRequest = req.clone({
      setHeaders: {
        'x-access-token': `${currentUser.token}`,
      },
    });
    return next(clonedRequest);
  }

  return next(req);
};
