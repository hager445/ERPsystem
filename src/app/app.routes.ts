import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import path from 'path';
import { Component } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { register } from 'module';
import { RegisterComponent } from './pages/register/register.component';
import { MailLayoutComponent } from './layouts/main-layout/main-layout.component';
import { authGuard } from '../core/guards/auth/auth.guard';

export const routes: Routes = [
    {
        path:'', component:AuthLayoutComponent,children:[
          {
            path:'login' , loadComponent:()=>import('./pages/login/login.component').then(c=>c.LoginComponent),
            
          }
          ,
          {
            path:'register',loadComponent:()=>import('./pages/register/register.component').then(c=>c.RegisterComponent)
          }
         
          ,
          {
            path:'imageform',loadComponent:()=>import('./shared/components/imageform/imageform.component').then(c=>c.ImageformComponent)
          }
        ]
    },
    {
        path:'', canActivate:[authGuard] ,component:MailLayoutComponent,children:[
          {
            path:'profile' , loadComponent:()=>import('./pages/profile/profile.component').then(c=>c.ProfileComponent),
            
          },
          {
            path:'settings' , loadComponent:()=>import('./pages/settings/settings.component').then(c=>c.SettingsComponent),
            
          },
          
          {
            path:'users',loadComponent:()=>import('./pages/users/users.component').then(c=>c.UsersComponent)
          }
         
        ]
    },
];
