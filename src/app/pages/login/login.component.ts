import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
   loginUser:FormGroup;
  constructor(private fb:FormBuilder,private _Auth:AuthService, private Router:Router){
this.loginUser = this.fb.group(
  {
   
    email:[null,[Validators.required,Validators.email]],
    
    password:[null,[Validators.required]],
   
  }
)
  }
  loginSubmition(){
   console.log('login',this.loginUser);
   if(!this.loginUser.valid) return;
   const { email, password } = this.loginUser.value;
   this._Auth.signIn(email,password).then(()=>{
    console.log('done');
    
    this.Router.navigate(['/profile'])
   });
  }
}
