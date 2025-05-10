import { supabase } from './../../../app/enviroments/supabase-client/supbase-client';
import { Injectable } from '@angular/core';
import { AuthResponse, RealtimeChannel, User } from '@supabase/supabase-js';
import { BehaviorSubject, first, from, Observable, skipWhile } from 'rxjs';
import { Iprofile } from '../../interface/auth-user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private user = new BehaviorSubject<User|null|undefined>(undefined);
$user = this.user.pipe(skipWhile(_=>typeof _ === undefined)) as Observable<User|null>;
private profile = new BehaviorSubject<|null|undefined>(undefined);
$profile = this.user.pipe(skipWhile(_=>typeof _ === undefined)) as Observable<User|null>;
user_id?:string;
private profile_supscribtion?:RealtimeChannel;
  constructor() {
    supabase.auth.getUser().then(({data,error})=>{
         this.user.next(data&&data.user&&!error?data.user:null)
    })
    // =============
    supabase.auth.onAuthStateChange((event,session)=>{
       this.user.next(session?session.user:null)
    })
    // ==================== supabase realtime :
    // meanes watch all changes happen on profile table to reflect it in our app :
    // we check if user exist :
// whenever user updated
    this.$user.subscribe(user=>{
      if (user) {
        if (user.id !== this.user_id) {
          const user_id = user.id;
          this.user_id = user_id;
          supabase.from('staff_profile').select('*').match({user_id}).single().then(res=>{
            this.profile.next(res.data??null);
            this.profile_supscribtion = supabase.channel('public:staff_profile').on('postgres_changes',{
              event:'*',
              schema: 'public',
              table:'staff_profile',
              filter:'user_id='+ user.id,
            },
            (payload:any)=>{
              this.profile.next(payload.new);
            }
          ).subscribe();
          })
        }
      } else {
        // If there is no user, update the profile BehaviorSubject, delete the user_id, and unsubscribe from Supabase Realtime
        this.profile.next(null);
        delete this.user_id;
        if (this.profile_supscribtion) {
          supabase.removeChannel(this.profile_supscribtion).then(res => {
            console.log('Removed profile channel subscription with status: ', res);
          });
        }
      }
    })
   }
  //  =====================================
  // registeration:
  signUp(user:Iprofile,email:string,password:string):Observable<AuthResponse>{
  return from(supabase.auth.signUp({email,password,options:{data:user}}).then(
      ({data})=>{
        
        const userId = data.user?.id; 
        console.log('id' , userId);
        supabase.from('staff_profile').insert(
          {
user_id:userId,
full_name:user.name,
phone:user.phone,
role:user.role            
          }
        )
        return {data} as AuthResponse;
      }
    ))

  }
  //  ================= signin
   signIn(email:string,password:string){
     return new Promise<void>((resolve,reject)=>{
       this.profile.next(undefined);
      supabase.auth.signInWithPassword({email,password}).then(
        ({data,error})=>{
          console.log(data);
          
          if(!data||error) reject('Invalid SignIn!');
          // we dont navigate into home unless making sure the profile is updated :

          this.$profile.pipe(first()).subscribe((res)=>
          {
            resolve();
           
            
          } 
          )
        }
      )
    })
   }
  //  =============
  logOut(){
    return supabase.auth.signOut()
  }
}
