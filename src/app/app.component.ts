import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";

@Component({
  selector: 'app-root',
  imports: [ AuthLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ERPsystem';
}
