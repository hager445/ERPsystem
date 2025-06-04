import { Injectable, signal } from '@angular/core';
import { Toggle, ToggleName } from '../../interface/toggle/toggle';
 
@Injectable({
  providedIn: 'root'
})
export class InteractionsService {
  toggleStatus = signal<Toggle[]>([
    // sort
    {
      relatedTo:0,
      status:false
    },
    // profile
    {
      relatedTo:1,
      status:false
    },
  ]);
   isOpened = signal<boolean>(false);
  constructor() { }
}
