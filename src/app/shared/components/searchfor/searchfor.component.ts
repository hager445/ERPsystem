import { filter } from 'rxjs';
import { Component, Input } from '@angular/core';
import { RepositoryService } from '../../../../core/services/repo/repository.service';
import { UserService } from '../../../../core/services/user/user.service';

@Component({
  selector: 'app-searchfor',
  imports: [],
  templateUrl: './searchfor.component.html',
  styleUrl: './searchfor.component.css'
})
export class SearchforComponent {
// we send two values :
// filter value to determine which to search :
// search vale (stream of letters):
// فكرتي اني ببعت قيمة محدش يعرفها والقيمة دي هيتم مقارنتها باسم العمود فالباك اند لو بيساوو بعض فالسيرش قيمته  هيتم مقارنته بس بقيمة العمود دا 
 matched:string|null=null
@Input() columnsName :string[]|null=null;
constructor(private _Repo:RepositoryService, private _Users:UserService){}
checkFilterBy(e:Event){
  const selectElement= e.target as HTMLInputElement;
  const filterValue = selectElement.value;
  console.log(filterValue);
 this.matched = this.columnsName?.filter((colName)=>{
return colName.toLowerCase() === filterValue.toLowerCase();
})[0]||null;
}
onSearch(e:Event){
 const inputSearchElement= e.target as HTMLInputElement;
  const searchValue = inputSearchElement.value;
  if (this.matched) {
    this._Repo.searchQuery(this.matched,searchValue).then((res)=>{
     this._Users.users.next(res);
    })
  }
}
}
