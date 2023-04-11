import { URLBasic } from "../../data/types/dataConfig"

export const getPicUrl=(picFile:string)=>{
    if(!picFile)return""
    const b_URL=URLBasic+"/uploads/pic"
    return b_URL+"/"+picFile;
}

export const getAvatarUrl=(avatar:string)=>{
    if(!avatar)return""
    const b_URL=URLBasic+"/uploads/avatar"
    return b_URL+"/"+avatar;
}