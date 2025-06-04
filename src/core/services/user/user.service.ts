import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Iprofile } from '../../interface/profile.interface';
import { supabase } from '../../../app/enviroments/supabase-client/supbase-client';
import { Table } from 'primeng/table';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, from, map, Observable, of, tap } from 'rxjs';
import { Imode } from '../../interface/imode';
import { Iuser } from '../../interface/user';
import { RepositoryService } from '../repo/repository.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 users = new BehaviorSubject<Iprofile[]|null>(null);
private _Auth = inject(AuthService);
private _Repo = inject(RepositoryService);
private _Toastr = inject(ToastrService);
isAdmin=signal<boolean>(false);
user=signal<Iprofile>({} as Iprofile);

  constructor(private _Http:HttpClient) {
    this.checkIfAdmin();
  }
// crud operations :
readUsers():Observable<Iprofile[]|null>{

 return from(
this._Repo.findAll()  
).pipe(
  tap((res)=>{
    if (res) {
      this.users.next(res);
    }
  }),
  map((res)=>{
   return res??null;
  }),
 

)
}
refreshUsers():void{
this.readUsers().subscribe();
}
createUser(user:Iprofile):Observable<any>{
return from(this._Http.post('http://localhost:3000/create-user',user));
}
setupUser(user:Iprofile){
  // get user info
   this.user.set(user);
  
   
}
 updateUser(user:Partial<Iprofile>):Observable<Iprofile[]|null>{
  const userId = this.user().user_id;
  console.log(userId , 'id from update');
return from(
  this._Repo.updateById({'full_name':user.full_name , 
  phone:user.phone,
    role:user.role  ,
    position:user.position,
    location:user.location,
},userId)).pipe(map(res=>{
return res??null
}),
  tap((data)=>{
     if (data ) {
this.refreshUsers()
  }
    }),catchError(err=>{
      this._Toastr.error(`${err}`,'Oops!')
      return of(null);
    })
  

)
}
// =======================
deleteUsers(userId:string){
 return this._Http.delete(`http://localhost:3000/delete-user/${userId}`);
}
clearALL(){

}
// ========================
checkIfAdmin(){
this._Auth.$profile.subscribe((res)=>{
if (res?.role.toLowerCase()==='ADMIN'.toLowerCase()) {
  this.isAdmin.set(true);
}else{
  this.isAdmin.set(false);
}
})

}
}
