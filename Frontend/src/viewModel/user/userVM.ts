import { T_userLocalStorage } from "../../contexts/authContext/AuthProvider";
import { default_User, default_UserCredential } from "../../data/types/user";
import { T_userInfoLoginDto, T_userInfoRegisterDto } from "./userDtos";

// login module
export const login = async (
    userInfo: T_userInfoLoginDto
  ): Promise<T_userLocalStorage> => {
    const url="http://localhost:3000/auth/login";
    try {
        const data= await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userInfo)
          })
          const dataJson=await data.json();
          console.log(dataJson)
  
      return {
        userCredential: {...dataJson.token,isLogin:true},
        user: dataJson.user,
      };
    } catch (err) {
      return { user: default_User, userCredential: default_UserCredential };
    }
  };

  // register
  export const register = async (
    userInfo: T_userInfoRegisterDto
  ): Promise<T_userLocalStorage> => {
    const url="http://localhost:3000/auth/register";
    try {
      const data= await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(userInfo)
      })
      const dataJson=await data.json();
      console.log(dataJson)
      const loginDto:T_userInfoLoginDto={email:userInfo.email,password:userInfo.password}
      const dataLogin= await login(loginDto);
      return dataLogin;
    } catch (err) {
      return { user: default_User, userCredential: default_UserCredential };
    }
  };
