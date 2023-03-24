import { T_fetch_meta } from "../../data/types/dataConfig"

// Used for from fetch
export type T_commentFetch_Data={
    avatar:string,
    content:string,
    createdAt:string,
    id:string,
    topicId:string,
    updatedAt:string,
    userName:string,
    userId:string,
}

export type T_commentFetch={
    data:T_commentFetch_Data[],
    meta:T_fetch_meta,
}

// Used for frontend
export type T_Comment={
    id:string,
    createdAt:Date,
    updatedAt:Date,
    content:string,
    userId:string,//who post it
    userName:string,//who post it
    topicId:string,//comment to which
    avatar:string,
}

export const default_Comment:T_Comment={
    id:"",
    createdAt:new Date(),
    updatedAt:new Date(),
    content:"",
    userId:"",//who post it
    userName:"",
    topicId:"",//comment to which
    avatar:"",
}


// used for new comment
export type T_commentNewDto={
    content:string,
    topicId:string,

}

export const default_commentNewDto:T_commentNewDto={
    content:"",
    topicId:""
}