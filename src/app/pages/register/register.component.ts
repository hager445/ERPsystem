import { Component } from '@angular/core';

import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { checkSamePass } from '../../../core/validators/password.validator';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerUser:FormGroup;
  constructor(private flowbiteService: FlowbiteService , private fb:FormBuilder , private _Auth:AuthService) {

    // ============ Initailize form group: 
    this.registerUser = this.fb.group(
      {
        name:[null,[Validators.required,Validators.minLength(3),Validators.pattern(/^[a-zA-Z\s]+$/)]],
        email:[null,[Validators.required,Validators.email]],
        phone:[null,[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)	]],
        password:[null,[Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/)]],
        rePassword:[null,[Validators.required ,checkSamePass()]],
        role:[null,[Validators.required]],
      }
    )
  }


 async registerSubmition(){
    console.log(this.registerUser);

    if(!this.registerUser.valid) return;
    const {email,password} = this.registerUser.value
this._Auth.signUp(this.registerUser.value,email,password).subscribe(
  res=>{
console.log(res);

  
})
    
  }


  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

}
