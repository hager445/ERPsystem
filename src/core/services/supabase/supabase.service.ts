import { inject, Injectable } from '@angular/core';
// this as a service could be injected :
import {createClient, SupabaseClient} from '@supabase/supabase-js'
// SupabaseClient a type , createClient to deal with supabase
@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
//    supabase!:SupabaseClient;
//  supabaseUrl ='https://anzklythyjubzjgcqewl.supabase.co'
//  supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuemtseXRoeWp1YnpqZ2NxZXdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNTc2NTksImV4cCI6MjA2MDYzMzY1OX0.7zw0hwqj3kSJIy8bsOHT2WlxKy9BllzRXDkL0OCRKdw'
//   constructor() { 
//       // Initialize Supabase client
// this.supabase = createClient(
// this.supabaseUrl,
// this.supabaseKey
// )
// this.supabase.from('users').select().then(({ data, error }) => {
//   if (error) {
//     console.error('Error:', error);
//   } else {
//     console.log('Data:', data);
//   }
//   })}
//   // use a method to get supabase client , enable you to call it in diff places:
  // getSupabaseClient():SupabaseClient{
  //   return this.supabase;
  // }
  // async fetchData(tableName:string) {
  //   const { data, error } = await this.supabase.from(tableName).select('*');
  
  //   if (error) {
  //     console.error('Error fetching data:', error);
  //     return;
  //   }
  
  //   console.log('Fetched data:', data);
  // }
}
