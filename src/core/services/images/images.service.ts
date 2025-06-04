import { inject, Injectable } from '@angular/core';
import { supabase } from '../../../app/enviroments/supabase-client/supbase-client';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { promises } from 'dns';
import { UserService } from '../user/user.service';
import { RepositoryService } from '../repo/repository.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  private _Auth= inject(AuthService);
  private _User= inject(UserService);
  private _Repo= inject(RepositoryService);
  private _Toastr= inject(ToastrService);
  constructor() {
   this.setDefaultImage().then();
   }
  async setDefaultImage() {
 
   const defaultImage = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
    let url;

  if (!url) {
    const response = await fetch(defaultImage);
    const blob = await response.blob();
    await this._Repo.storeInBucket('defaultUserImage', blob, { contentType: 'image/png' });

    // بعد الرفع نحصل على الرابط مرّة تانية
    url = this._Repo.getImageUrl('defaultUserImage'); 
  }

  // هنا نتأكد إن url موجود فعلًا قبل ما نحدث
  if (url) {
    await supabase.from('staff_profile').update({ image: url }).is('image', null);
  }
 
}

//  getting the image link
async uploadImage(file:File){
  try{
    
    const fileExt = file.name.split('.').pop(); // امتداد الصورة
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000);
    const safeFileName = `image_${timestamp}_${randomNum}.${fileExt}`;
    const filePath = `${safeFileName}`;
    
    const {error:uploadedError} = await this._Repo.storeInBucket(filePath,file);
    if (uploadedError) throw Error;
    return this._Repo.getImageUrl(filePath);
  }catch(error){
      this._Toastr.error('Something went wrong for uploading user image!','Oops!')
      return;
    }
    }
//  ===================
    // update the profile value
    async changeUserImage(event:Event): Promise<void>{
      const file = (event.target as HTMLInputElement).files?.[0];
      if(file){
         const userId = this._Auth.user_id;
         if (userId) {
            const imageUrl = await this.uploadImage(file);
            if (imageUrl && imageUrl !== undefined) {
              await this._Repo.updateById({image:imageUrl},userId);
              this._Repo.findById(userId).then(res=>{
                  const newProfile = res?.[0];
                  this._Auth.profile.next(newProfile);
                })
              this._Repo.findAll().then(res=>{
                  const users = res;
                  this._User.users.next(users);
                 
                })
               
            }
          
         }
      }
      }
}
