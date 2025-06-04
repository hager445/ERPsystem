import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { supabase } from '../../../enviroments/supabase-client/supbase-client';
import { Router } from '@angular/router';
import { ImagesService } from '../../../../core/services/images/images.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-imageform',
  imports: [],
  templateUrl: './imageform.component.html',
  styleUrl: './imageform.component.css'
})
export class ImageformComponent {
  isSelected:boolean =false;
  private _Toaster = inject(ToastrService);
  private _Image = inject(ImagesService);
  private _Router = inject(Router);
  constructor(){

  }
  // set if image selected:
async onSelectedImage(event:Event){
  this._Image.changeUserImage(event).then(()=>{
   this.isSelected = true;
  })
}
// ================================
saveImageOperation(){
  if (!this.isSelected)return;
  console.log('image saved successfully');
  this._Router.navigate(['/login']);
  this.isSelected = false;
}
// ========== skip selecting :
skipImage(){ 
  this._Image.setDefaultImage().then(()=>{
    this._Router.navigate(['/login']);
  })
}
}
