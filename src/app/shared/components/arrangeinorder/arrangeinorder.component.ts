import { Component, effect } from '@angular/core';
import { RepositoryService } from '../../../../core/services/repo/repository.service';
import { UserService } from '../../../../core/services/user/user.service';
import { IsortOption, sortField } from '../../../../core/interface/sort/sort';
import { catchError, from, map, of, switchMap, tap } from 'rxjs';
import { InteractionsService } from '../../../../core/services/interactions/interactions.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-arrangeinorder',
  imports: [CommonModule],
  templateUrl: './arrangeinorder.component.html',
  styleUrl: './arrangeinorder.component.css'
})
export class ArrangeinorderComponent {
  sortIsOpened:boolean=false;
options:IsortOption[]=[
  {value:sortField.FULL_NAME,
    label:'user name',
    order:'asc'
  },
   { value: sortField.EMAIL, label: 'Email', order: 'asc' },
    { value: sortField.POSITION, label: 'Position', order: 'asc' },
    { value: sortField.ROLE, label: 'Role', order: 'asc' },
    { value: sortField.CREATED_AT, label: 'Created Date', order: 'desc' }
];
constructor(private _Repo:RepositoryService,private _Users:UserService,private _Interactions:InteractionsService){
  effect(()=>{
  this.sortIsOpened= this._Interactions.toggleStatus()![0].status;

  })
}
sortBy(optionValue:IsortOption){
  this._Repo.sortValue.next(optionValue);
  this.loadUsersBySorting();
  this.sortIsOpened = false;
}
loadUsersBySorting(){
this._Repo.sortValue.pipe(
switchMap((sortOption:IsortOption)=>{
 return from(this._Repo.findAll(sortOption));
})
,
catchError((error)=>{
  console.log(error);
  // لازم نرجع تيار بيانات ف كدا لو حصل اي خطا هيرجعلي null
  return of(null)
  
})).subscribe((users)=>{
  if (users) {
  this._Users.users.next(users);
  }
})
}
// ==============

}
