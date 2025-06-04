import { Component, effect, ElementRef, HostListener, inject, Renderer2, ViewChild } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ButtonModule } from 'primeng/button';
import { Iprofile } from '../../../core/interface/profile.interface';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Metadata } from '../../../core/interface/metadata/metadata';
import { every, map, Subject, takeUntil, tap } from 'rxjs';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { ImagesService } from '../../../core/services/images/images.service';
import { supabase } from '../../enviroments/supabase-client/supbase-client';
import { RegisterComponent } from '../register/register.component';
import { InteractionsService } from '../../../core/services/interactions/interactions.service';

@Component({
  selector: 'app-profile',
  imports: [ButtonModule, RegisterComponent,DatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  updateMode:boolean=false;
  // @ViewChild(ProfileComponent) profileComponent!: ProfileComponent;

  @ViewChild('fileInput') fileInput!:ElementRef<HTMLInputElement>;
  @ViewChild('updateModal') updateModal!:ElementRef<HTMLElement>;
  @ViewChild('aside') aside!:ElementRef<HTMLElement>;
  private destroy$ = new Subject<void>();
 private _Image = inject(ImagesService);
 private _Auth = inject(AuthService);
 imageUrl?:string;
 $profileInfo?:Partial<Iprofile>;
 userEmail?:string;
 $createdAt?:string;
 $lastUpdateAt?:string;
 $lastSigninAt?:string;
 constructor(private _Renderer:Renderer2,private _Interactions:InteractionsService ){

  //  =========================
  this.showingUserProfile();
 this.getUserMetadata();
effect(()=>{
 const isOpened = this._Interactions.toggleStatus()![1].status;
 if (isOpened) {
 this._Renderer.addClass(this.aside.nativeElement,'section-visible');
 this._Renderer.removeClass(this.aside.nativeElement,'section-hidden');
}else{
   this._Renderer.removeClass(this.aside.nativeElement,'section-visible');
   this._Renderer.addClass(this.aside.nativeElement,'section-hidden');

 }
})
}

getUserMetadata(){
  this._Auth.$user.subscribe(res=>{
  this.userEmail =  res?.email;
  this.$createdAt = res?.created_at;
  this.$lastSigninAt = res?.last_sign_in_at;
  this.$lastUpdateAt = res?.updated_at ;

  })
}
  showingUserProfile(){
    this._Auth.$profile.pipe(
      takeUntil(this.destroy$)
  
     ).subscribe(res=>{
       if (res) {
         
         this.$profileInfo = res;
        console.log('profile',res);
        console.log('profile',res.full_name);
        console.log('profile',res.phone);
        console.log('profile',res.image);
      }
     
     })
  }
  // =============== trigger file:
  triggerInputFile(){
   this.fileInput.nativeElement.click();
  }
  //  change user image :

  async onUpdateImage(event:Event){
    this._Image.changeUserImage(event);
  }
  // ============== update profile:
  updateProfile(){
    this.updateMode=true;
   const modal = this.updateModal.nativeElement;
   this._Renderer.removeClass(modal,'hide');
   this._Renderer.addClass(modal,'show');
  }
  // ================ close profile
  @HostListener('click',['$event'])
  closeModal(event:Event){
    if (!this.updateMode) return;
    const clicked = event.target  as HTMLElement;
    // إذا لم يكن النقر داخل العنصر الذي يحتوي على الكلاس `update-modal`
    if (!clicked.classList.contains('update-modal')) {
      console.log(clicked.classList.contains('update-modal'))
    }
    
  }
//  dataToProfile(user:Metadata):Partial<Iprofile>
//  {
//   return{
//    id:user.sub,
//    full_name:user.name,
//    email:user.email,
//    phone:user.phone,
//    role:user.role as "Admin" | "User" | "Seller"
  
// } 
//  }
// ==========

 ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}

}
