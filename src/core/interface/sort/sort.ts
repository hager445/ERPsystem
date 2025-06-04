export interface IsortOption {
    value:sortField,
    label:string,
    order:'asc'|'desc'

}
export enum sortField{
     FULL_NAME = 'full_name',
  EMAIL = 'email', 
  POSITION = 'position',
  ROLE = 'role',
  CREATED_AT = 'created_at'
}