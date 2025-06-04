import { Component, effect, EventEmitter, Input, Output } from '@angular/core';

import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { checkSamePass } from '../../../core/validators/password.validator';
import { AuthService } from '../../../core/services/auth/auth.service';
import { supabase } from '../../enviroments/supabase-client/supbase-client';
import { ImageformComponent } from '../../shared/components/imageform/imageform.component';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user/user.service';
import { FormStateMangerService } from '../../../core/services/formStateManager/form-state-manager.service';
import { Imode } from '../../../core/interface/imode';
import { Iprofile } from '../../../core/interface/profile.interface';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Iuser } from '../../../core/interface/user';
import { ImagesService } from '../../../core/services/images/images.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, ImageformComponent,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  // selectUserImage:boolean = false;
  positions = [
    { label: 'Software Engineer', value: 'software_engineer' },
    { label: 'Frontend Developer', value: 'frontend_developer' },
    { label: 'Backend Developer', value: 'backend_developer' },
    { label: 'Full Stack Developer', value: 'full_stack_developer' },
    { label: 'Mobile Developer', value: 'mobile_developer' },
    { label: 'DevOps Engineer', value: 'devops_engineer' },
    { label: 'Data Scientist', value: 'data_scientist' },
    { label: 'Data Analyst', value: 'data_analyst' },
    { label: 'Machine Learning Engineer', value: 'ml_engineer' },
    { label: 'AI Engineer', value: 'ai_engineer' },
    { label: 'UI/UX Designer', value: 'uiux_designer' },
    { label: 'Product Manager', value: 'product_manager' },
    { label: 'Project Manager', value: 'project_manager' },
    { label: 'Scrum Master', value: 'scrum_master' },
    { label: 'Quality Assurance', value: 'quality_assurance' },
    { label: 'Test Automation Engineer', value: 'test_automation_engineer' },
    { label: 'System Administrator', value: 'system_admin' },
    { label: 'Cybersecurity Specialist', value: 'cybersecurity_specialist' },
    { label: 'Cloud Engineer', value: 'cloud_engineer' },
    { label: 'Network Engineer', value: 'network_engineer' },
    { label: 'Business Analyst', value: 'business_analyst' },
    { label: 'Technical Writer', value: 'technical_writer' },
    { label: 'Database Administrator', value: 'dba' },
    { label: 'Game Developer', value: 'game_developer' },
    { label: 'Blockchain Developer', value: 'blockchain_developer' },
    { label: 'SEO Specialist', value: 'seo_specialist' },
    { label: 'Digital Marketer', value: 'digital_marketer' },
    { label: 'Content Creator', value: 'content_creator' },
    { label: 'Sales Manager', value: 'sales_manager' },
    { label: 'Account Manager', value: 'account_manager' },
    { label: 'Customer Support', value: 'customer_support' },
    { label: 'Human Resources', value: 'hr' },
    { label: 'Office Manager', value: 'office_manager' },
    { label: 'Operations Manager', value: 'operations_manager' },
    { label: 'Finance Manager', value: 'finance_manager' },
    { label: 'Legal Advisor', value: 'legal_advisor' },
    { label: 'CEO', value: 'ceo' },
    { label: 'CTO', value: 'cto' },
    { label: 'CFO', value: 'cfo' },
    { label: 'COO', value: 'coo' },
    { label: 'Intern', value: 'intern' },
    { label: 'Freelancer', value: 'freelancer' },
    { label: 'Consultant', value: 'consultant' },

  ];

get formMode() : Imode {
  return  this._FormStateManager.formMode();
}
get user() : Iprofile {
  return  this._User.user();
}


  registerUser:FormGroup;
  constructor(private _Image:ImagesService,private _Toastr:ToastrService,private flowbiteService: FlowbiteService , private fb:FormBuilder , private _Auth:AuthService, private _Router :Router, private _User:UserService, private _FormStateManager:FormStateMangerService) {

 effect(()=>{
  if (this.formMode === 1) {
    this.gettingUpdatedUserToForm();
  } 
 })

    // ============ Initailize form group: 
    this.registerUser = this.fb.group(
      {
        full_name:[null,[Validators.required,Validators.minLength(3),Validators.pattern(/^[a-zA-Z\s]+$/)]],
        email:[null,[Validators.required,Validators.email]],
        phone:[null,[Validators.required, Validators.pattern(/^(1|01)[0125][0-9]{8}$/)	]],
        password:[null,[Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/)]],
        rePassword:[null,[Validators.required ,checkSamePass()]],
        role:[null,[Validators.required]],
        position:[null,[Validators.required]],
        location:[null,[Validators.required]],
        
      }
    )

  
  
  }
// =============
// hooks
 ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });


  }
  // ========================================================
  // the form
  registerSubmition(){

    if(!this.registerUser.valid) return;
    const {email,password} = this.registerUser.value;
     this._Auth.signUp(this.registerUser.value,email,password).subscribe(
     res=>{
      if (!res.data.user) return;
      this._Router.navigate(['/imageform']);
})
    
  }
  // close the form :
  closeForm(){
  this._FormStateManager.closeForm();
  this.registerUser.reset();
  }
  // ================================
  // handle update 
  gettingUpdatedUserToForm(){
  this.registerUser.patchValue(this.user);
  }
  // last update step (getting res from supabase)
  updateUserFromForm(){  
     if (this.registerUser.invalid) return;
    this._User.updateUser(this.registerUser.value).pipe(tap((res)=>{
      console.log(res, ' see update');
      
      if (res  && res.length > 0) {
        this._Image.setDefaultImage().then(()=>{
        
          this.closeForm();
          this._Toastr.success('User is updated Successfully!','Congratulations!' , {
            toastClass:'custom-toast'
          })
        })
      }
    })).subscribe();
      
    }
  // ===========================================
  // ADD :
  addNewUserSubmition(){
    const {email,password} = this.registerUser.value
    const user = this.registerUser.value
    console.log('from add form' , email , password , user);
    
    this._User.createUser( user).pipe(tap((data:Iuser)=>{
      const oldUsers:Iprofile[]|null = this._User.users.value;
      if (data.message === "User created successfully" && oldUsers) {
        this._Image.setDefaultImage().then(()=>{
           this._User.readUsers().subscribe();
        this.closeForm();
        })
       
      }
 
    })).subscribe()
  }
}
