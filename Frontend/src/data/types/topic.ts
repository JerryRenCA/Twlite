import { T_Comment } from "./comment";

export type T_Topic={
    title:string,
    content:string,
    id:string,
    createdAt:string,
    updatedAt:string,
    
    user_id?:string,// user who posted this topic,
    user_name?:string,
}

export const default_Topic:T_Topic={
    title:"",
    content:"",
    id:"",
    createdAt:"",
    updatedAt:"",
    
    user_id:"",// user who posted this topic,
    user_name:"",
}