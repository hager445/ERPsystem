import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { supabase } from '../../../app/enviroments/supabase-client/supbase-client';
import { Session } from '@supabase/supabase-js';

export const authGuard: CanActivateFn = async(route, state) => {
  const _Router = inject(Router);

  const {data}= await supabase.auth.getSession();
  if (!data.session){

    return _Router.createUrlTree(['/login']);

  } 
  return true;
};
