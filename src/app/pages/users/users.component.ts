import { Component, effect, signal, ViewEncapsulation } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
// import { ColumnFilterModule } from 'primeng/columnfilter'; // لو كنت تستخدمه بشكل منفصل
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { SelectModule } from 'primeng/select';
import { DatePipe } from '@angular/common';
import { UserService } from '../../../core/services/user/user.service';
import { supabase } from '../../enviroments/supabase-client/supbase-client';
import { Iprofile } from '../../../core/interface/profile.interface';
import { User } from '@supabase/supabase-js';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { style } from '@angular/animations';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { FormStateMangerService } from '../../../core/services/formStateManager/form-state-manager.service';
import { ImagesService } from '../../../core/services/images/images.service';
import { SearchforComponent } from '../../shared/components/searchfor/searchfor.component';
import { ArrangeinorderComponent } from "../../shared/components/arrangeinorder/arrangeinorder.component";
import { TogglebuttonComponent } from '../../shared/components/togglebutton/togglebutton.component';

@Component({
  selector: 'app-users',
  imports: [SearchforComponent, DatePipe, RegisterComponent, ArrangeinorderComponent,TogglebuttonComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  encapsulation: ViewEncapsulation.None

})
export class UsersComponent {
  users:Iprofile[]=[];
  usersEmail = signal<string>('');
  isAdmin:boolean = false;
  defaultImage :string=''
//  to check which mode we need to apply :
get formMode()  {
  return this._FormStateManager.formMode(); 
 }

//  to check if the form is opened or not:
  get formIsOpened()  {
  return this._FormStateManager.formIsOpened(); 
 }
 
isButtonDisabled :boolean = false;
constructor(private _Image:ImagesService,private _User :UserService , private _Auth:AuthService ,private _Toaster:ToastrService, private _Router:Router,private _FormStateManager:FormStateMangerService){
effect(()=>{
  this.isAdmin = this._User.isAdmin();
})
  this.getUsers();
  // this.defaultImage =  this._Image.defaultImage;
}
ngOnInit(): void {

this._User.users.subscribe(res=>{
  if (res) {
    this.users = res;
    console.log(this.users ,'users');
  }
})
}




// ======================================= functions
//  READ:
getUsers(){
  
  this._User.readUsers().subscribe();
}
// ============== delete user :
deleteUserById(userId:string):void{
  if (!this.isAdmin) return ;
  this._User.deleteUsers(userId).subscribe(()=>{
    const currentUser = this._Auth.user_id;
    if (currentUser === userId) {
         this._Auth.logOut().then(()=>{ 
        this._Router.navigate(['/login']);
      })
    }
     this.getUsers()
  })
}
// =============================================
// ADD :
// ========================= add :
setAddModeAsActive(){
  this._FormStateManager.formMode.set(0);
  this.openForm();
}
// =============== permissions for Admins only:
showToaster(){
  if (!this.isAdmin) {
    this.isButtonDisabled =true;
    this._Toaster.error('Only Admins can Delete , Add or Update Users!', 'Oops!',
  {toastClass: 'custom-toast',
  }
    );
  }
 
  
}
// ==============================
// handle update :
setUpdateModeAsActive(){
 this._FormStateManager.formMode.set(1);
}
SendUserInfo(user:Iprofile){
console.log(user , );
this._User.setupUser(user);
}

// handle form :
openForm():void{
this._FormStateManager.openForm();
}
// =============================

// ================================
onGlobalFilter(event: Event, table: Table) {
  const input = event.target as HTMLInputElement;
  table.filterGlobal(input.value, 'contains');
}

}
