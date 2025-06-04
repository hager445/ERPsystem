import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { AuthService } from '../../../core/services/auth/auth.service';
import { NavigationEnd, RedirectCommand, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [ToolbarModule,ButtonModule,AvatarModule,MenuModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  sidebarVisible:boolean = false;
  userName?:string;
  userImage?:string;
  menuItems = [
    { label: 'Settings', icon: 'pi pi-cog', command:()=>{this._Router.navigate(['/settings'])} },
    { label: 'Profile', icon: 'pi pi-user', command:()=>{this._Router.navigate(['/profile'])} },
    { separator: true },
    { label: 'Logout', icon: 'pi pi-sign-out', command:()=>{
      this._Auth.logOut().then(()=>{ 
        this._Router.navigate(['/login']);
      
      })
    } }
  ];
  constructor(private _Auth:AuthService, private _Router:Router){
    this._Router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // أي وقت المستخدم يغير الصفحة، اقفل السايدبار
      this.sidebarVisible = false;
    });
    this.gettingUserInfo()
  }
  
  gettingUserInfo(){
   this._Auth.$profile.subscribe((res)=>{
    this.userName = res?.full_name;
    this.userImage = res?.image;
   })
  }
}
