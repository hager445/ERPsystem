import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../pages/navbar/navbar.component";
import { SidebarComponent } from "../../pages/sidebar/sidebar.component";
import { ProfileComponent } from "../../pages/profile/profile.component";
import { TogglebuttonComponent } from "../../shared/components/togglebutton/togglebutton.component";
import { InteractionsService } from '../../../core/services/interactions/interactions.service';
import { CommonModule } from '@angular/common';
import { ProfileToggleComponent } from '../../shared/components/profile-toggle/profile-toggle.component';

@Component({
  selector: 'app-mail-layout',
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, ProfileComponent, TogglebuttonComponent,CommonModule , ProfileToggleComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MailLayoutComponent {
  profileIsOpened:boolean=false;
private _Interactions=inject(InteractionsService);
constructor(){
  effect(() => {
    const toggles = this._Interactions.toggleStatus();
    
    // Add better error checking
    if (toggles && Array.isArray(toggles) && toggles.length > 1) {
      this.profileIsOpened = toggles[1].status;
      console.log('Profile opened status:', this.profileIsOpened);
    } else {
      console.log('Toggles not available or invalid:', toggles);
    }
  });

}
}
