import { Injectable } from '@angular/core';
import { supabase } from '../../../app/enviroments/supabase-client/supbase-client';
import { Iprofile } from '../../interface/profile.interface';
import { PostgrestError, PostgrestMaybeSingleResponse, PostgrestSingleResponse } from '@supabase/supabase-js';
import type { FileOptions } from '@supabase/storage-js';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { IsortOption, sortField } from '../../interface/sort/sort';


@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  private  supabase = supabase;
   sortValue = new BehaviorSubject<IsortOption>({value:sortField.CREATED_AT,
       label:'user name',
       order:'asc'
     });
  constructor(private _Toastr:ToastrService) { }
 

async findById(id:string): Promise<Iprofile[]|null>{
   const {data,error} =  await supabase.from('staff_profile').select('*').eq('user_id',id);
   if (!data || error) throw error;
  //  يوقف استمرار الكود ولو عاوزه اطبعه بستخدم catch 
   return data;
  }
 async findAll(sortOption?:IsortOption): Promise<Iprofile[]|null>{
  // عشان نكون فاهمين الدالة الغير متزامنة دايما بترجعلي نتيجة غير متزامنة زي ال promise 
  // فاللي راجع جوا الوعد هو عبارة عن obj so we apple destructuring ;
  // اللي راجع من supabase is promise بس مستني يخلص ولما بيخلص بيرجعلي النتيجة النهائية object ;
  // await لا تغير نوع القيمة، لكنها بتفك الـ Promise وترجعلك القيمة اللي جواه.;
    const {data , error} = await supabase.from('staff_profile').select('*').order(`${sortOption?.value ? sortOption.value : 'created_at'}`,{ ascending: sortOption?.order? sortOption?.order === 'asc' : false });
    if (!data || error) throw error;
    return data ?? [] ;
  }
  // ==================
 async updateById(value:object,id:string):Promise<Iprofile[]|null>{
  try{

    const {data,error} = await supabase.from('staff_profile').update(value).eq('user_id',id).select();
     if (!data || error) throw error;
     console.log(data , 'try to update from repo ');
     
     return data ?? [] ;
  }catch(error){
   console.log(error , 'update image');
   return null;
  }
  }
    // ================== handle images:
  async storeInBucket(imageName:string , file: Blob|File, options?: FileOptions){
  return await supabase.storage.from('profile-image').upload(imageName,file , options);
    }
    getImageUrl(filePath:string):string|undefined{
    const publicUrl =   supabase.storage.from('profile-image').getPublicUrl(filePath).data.publicUrl;
   if (!publicUrl) return;
    return publicUrl;
    }



  async searchQuery(colmnName:string,value:string): Promise<Iprofile[]|null>{
   try{
       const { data, error } = await supabase
  .from('staff_profile')
  .select('*')
  .ilike(colmnName, `%${value}%`);
  if (!data || error) throw error;
  return data;
   }catch(err){
    this._Toastr.error(`${err}`,'Oops!');
    return null;
   }
  }
  }

