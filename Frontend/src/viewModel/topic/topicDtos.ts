import { default_fetch_meta, T_fetch_meta } from "../../data/types/dataConfig"

// Used for frontend
export type T_Topic={
    title:string,
    content:string,
    id:string,
    createdAt:Date,
    updatedAt:string,
    userId?:string,// user who posted this topic,
    userName?:string,
    avatar:string,
    
}

export const default_Topic:T_Topic={
    title:"",
    content:"",
    id:"",
    createdAt:new Date(),
    updatedAt:"",
    userId:"",// user who posted this topic,
    userName:"",
    avatar:"",
    
}

// Used for from fetch
export type T_topicFetch_Data={
    avatar:string,
    content:string,
    createdAt:string,
    id:string,
    title:string,
    updatedAt:string,
    userName:string,
    userId:string,
}

export type T_topicFetch={
    data:T_topicFetch_Data[],
    meta:T_fetch_meta,
}

// Used for create new topic
export type T_topicNewDto={
    title:string,
    content:string,
}

export const default_topicNewDto:T_topicNewDto={
    title:"",
    content:"",
}