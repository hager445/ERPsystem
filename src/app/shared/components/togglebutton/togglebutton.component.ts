import { Component, inject, Input } from '@angular/core';
import { stat } from 'fs';
import { InteractionsService } from '../../../../core/services/interactions/interactions.service';
import { Toggle } from '../../../../core/interface/toggle/toggle';

@Component({
  selector: 'app-togglebutton',
  imports: [],
  templateUrl: './togglebutton.component.html',
  styleUrl: './togglebutton.component.css'
})
export class TogglebuttonComponent {
  private _Interactions = inject(InteractionsService);
 @Input() toggleStatus:Toggle|null = null;
  isOpened!:boolean;

  toggleProfile(){
    this.isOpened = !this.isOpened;
    
    const toggleStatusSignal =this._Interactions.toggleStatus();
    if (  toggleStatusSignal &&
       this.toggleStatus?.relatedTo ===
        toggleStatusSignal[this.toggleStatus?.relatedTo!].relatedTo ) {
       toggleStatusSignal[this.toggleStatus?.relatedTo].status = this.isOpened;
         this._Interactions.toggleStatus.set([...toggleStatusSignal]);
       console.log(toggleStatusSignal);
       console.log(  this._Interactions.toggleStatus());
        }}
}
