
// map the user table in postgresql
export type T_User={
    id:string,
    createdAt:string,
    updatedAt:string,
    firstName:string,
    lastName:string,
    role:string,
    email:string,
    avatar:string,
    phone:string,
    isAvtive:boolean,
}

export const default_User:T_User={
    id:"",
    createdAt:"",
    updatedAt:"",
    firstName:"",
    lastName:"",
    role:"",
    email:"",
    avatar:"",
    phone:"",
    isAvtive:true,
}
// map the user setting table in postgresql
export type T_userSetting = {
    name: string;
    createdAt: string;
    profileIcon: string;
    location: string;
  };
  
  export const default_userSetting: T_userSetting = {
    name: "",
    createdAt: "",
    profileIcon: "",
    location: "",
  };

// used to store the data just for client and not exist in postgresql
export type T_UserCredential={
    isLogin:boolean,
    expiresIn:number,
    accessToken:string
}

export const default_UserCredential:T_UserCredential={
    isLogin:false,
    expiresIn:0,
    accessToken:"",
}