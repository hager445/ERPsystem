import { inject, Injectable } from '@angular/core';
// this as a service could be injected :
import {createClient, SupabaseClient} from '@supabase/supabase-js'
// SupabaseClient a type , createClient to deal with supabase
@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

}
