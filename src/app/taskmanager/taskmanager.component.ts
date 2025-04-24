// import { Component } from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {supabase} from '../enviroments/supabase-client/supbase-client'
@Component({
  selector: 'app-task-manager',
  imports:[FormsModule],
  templateUrl: './taskmanager.component.html',
  styleUrls: ['./taskmanager.component.css']
})
export class TaskManagerComponent {
  taskName: string = '';
  taskDescription: string = '';
  tasks: { name: string; description: string }[] = [];
ngDoCheck(): void {
  //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
  //Add 'implements DoCheck' to the class.
}
async handleSubmit(){
  if (this.taskName && this.taskDescription) {
    await supabase
      .from('tasks')
      .insert({ title: this.taskName, description: this.taskDescription })
      .single();
      
  
  }} 

}
