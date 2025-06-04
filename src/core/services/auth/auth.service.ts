import { supabase } from './../../../app/enviroments/supabase-client/supbase-client';
import { inject, Injectable } from '@angular/core';
import { AuthResponse, RealtimeChannel, User } from '@supabase/supabase-js';
import { BehaviorSubject, filter, first, from, Observable, skipWhile } from 'rxjs';
import { Iprofile } from '../../interface/profile.interface';
import { ImagesService } from '../images/images.service';
// import { v4 as uuidv4 } from 'uuid'; // لو عندك uuid

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private user = new BehaviorSubject<User|null|undefined>(undefined);
$user = this.user.pipe(skipWhile(_=> _ === undefined)) as Observable<User|null>;
profile = new BehaviorSubject<Iprofile|null|undefined>(undefined);
$profile = this.profile.pipe(skipWhile(_=> _ === undefined)) as Observable<Iprofile|null>;
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
     
          const user_id = user.id;
          this.user_id = user_id;
          // ==== get the image: 
          supabase.from('staff_profile').select('*').match({user_id}).single().then(res=>{
            this.profile.next(res.data??null);
            console.log('from auth service1' , this.profile.value);
            
            this.profile_supscribtion = supabase.channel('public:staff_profile').on('postgres_changes',{
              event:'*',
              schema: 'public',
              table:'staff_profile',
              filter:'user_id='+ user.id,
            },
            (payload:any)=>{
              this.profile.next(payload.new);
              console.log('from auth service2' , this.profile.value);
            }
          ).subscribe();
          })
        
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
// console.log('id from service2',this.user_id);

   }
  //  =====================================
  // registeration:
  signUp(user:Iprofile,email:string,password:string):Observable<AuthResponse>{
  return from(
    supabase.auth.signUp({email,password,options:{data:user}}).then(
     async ({data,error})=>{
      console.log('from sign up' , email , password , user);
       console.log(error);
       
        const userId = data.user?.id; 
        console.log('id' , userId);
        if (userId) {
          
          await supabase.from('staff_profile').insert(
              {
    user_id:userId,
    full_name:user.full_name,
    phone:user.phone,
    role:user.role  ,
    position:user.position,
    location:user.location,
    email:user.email,
    password:user.password,
    rePassword:user.rePassword
             
              }
            )
        }
        return {data} as AuthResponse;
      }
    ))

  }
  //  ================= signin
   signIn(email:string,password:string){
     return new Promise<void>((resolve,reject)=>{
      console.log('before',this.profile.value);
      this.profile.next(undefined);
      console.log('after1',this.profile.value);
      // console.log('after1',this.profile.value);
      supabase.auth.signInWithPassword({email,password}).then(
        ({data,error})=>{
          console.log(email , password);
          
          if(!data||error){
            reject(
               'Invalid SignIn!');
               return ;
          }
            // we dont navigate into home unless making sure the profile is updated :
            console.log('after2',this.profile.value);
            
            supabase
            .from('staff_profile')
            .select('*')
            .eq('user_id', data.user?.id)
            .single()
            .then(({ data: profileData }) => {
              this.profile.next(profileData);
              resolve();
            });
          
          
        }
      )
    })
   }
  //  =============
  logOut(){
    return supabase.auth.signOut();
  }
  // =========================== upload image

}
