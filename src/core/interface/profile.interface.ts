export interface Iprofile {
id:string,
full_name:string,
email:string,
phone:string,
role:'Admin'|'Manger'|'Employee'|'Customer',
image:string,
position:string,
location:string,
password:string,
rePassword:string,
user_id:string,
created_at:string
}