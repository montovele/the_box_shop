export class User {
  user_type_id: number;
  user_status_id: number;
  representative_id: number;
  created_on: Date;
  email: string;
  phone: string;
  name: string;
  lastname: string;
  password: string;
  country:string;
  state:string;
  city:string;
}

export class userFilter{
  user_type_id?: number;
  user_status_id?: number;
  criteria?:string;
  constructor(){
    this.user_type_id = null;
    this.user_status_id = null;
    this.criteria = "";
  }
 }

 export enum FilterTypes{
  type = 1,
  status = 2,
  search = 3
}