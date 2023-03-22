import { T_CommentReply } from "./commentReply"

export type T_Comment={
    id:string,
    createdAt:string,
    updatedAt:string,
    content:string,
    user_id:string,//who post it
    topic_id:string,//comment to which
}

export const default_Comment:T_Comment={
    id:"",
    createdAt:"",
    updatedAt:"",
    content:"",
    user_id:"",//who post it
    topic_id:"",//comment to which
}