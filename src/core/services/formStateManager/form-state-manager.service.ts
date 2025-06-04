import { Injectable, signal } from '@angular/core';
import { Imode } from '../../interface/imode';

@Injectable({
  providedIn: 'root'
})
export class FormStateMangerService {
// handle update :
formMode = signal<Imode>(Imode.register);
formIsOpened = signal<boolean>(false);
  constructor() { }
  openForm():void{
   this.formIsOpened.set(true);
  }
  closeForm():void{
    this.formIsOpened.set(false);

  }
}
