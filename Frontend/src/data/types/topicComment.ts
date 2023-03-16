import { T_CommentReply } from "./commentReply"

export type T_TopicComment={
    content:string,
    user_id:string,//who post it
    topic_id:string,//comment to which
    // replys:T_CommentReply[];
}