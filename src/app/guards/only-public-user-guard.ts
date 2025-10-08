import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const onlyPublicUserGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const auth = inject(AuthService);
  if(auth.token){
    const newPath = router.parseUrl("/");
    return new RedirectCommand(newPath,{
      skipLocationChange: true,
    });
  }
  return true;
};
