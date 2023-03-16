export type T_userInfoRegisterDto={
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    phone:string,
}
export const default_userInfoRegisterDto:T_userInfoRegisterDto={
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    phone:"",
}
export type T_userInfoLoginDto={
    email:string,
    password:string,
}
export const default_userInfoLoginDto:T_userInfoLoginDto={
    email:"",
    password:"",
}