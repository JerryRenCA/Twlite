import { T_userLocalStorage } from "../../contexts/authContext/AuthProvider";
import { URLBasic } from "../../data/types/dataConfig";
import { default_User, default_UserCredential } from "../../data/types/user";
import { T_userInfoLoginDto, T_userInfoRegisterDto } from "./userDtos";

// login module
export const login = async (
  userInfo: T_userInfoLoginDto
): Promise<T_userLocalStorage> => {
  const url = URLBasic + "/auth/login";
  try {
    const data = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    const dataJson = await data.json();
    console.log(dataJson);

    return {
      userCredential: { ...dataJson.token, isLogin: true },
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
  const url = URLBasic + "/auth/register";
  try {
    const data = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    const dataJson = await data.json();
    console.log(dataJson);
    const loginDto: T_userInfoLoginDto = {
      email: userInfo.email,
      password: userInfo.password,
    };
    const dataLogin = await login(loginDto);
    return dataLogin;
  } catch (err) {
    return { user: default_User, userCredential: default_UserCredential };
  }
};

// Update Avatar
export const updateUserAvatar = async ({
  file,
  bearer,
}: {
  file: File;
  bearer: string;
}): Promise<T_userLocalStorage> => {
  const url = URLBasic + "/users/avatar";
  const formData = new FormData();
  if (file) formData.append("avatar", file);
  try {
    const data = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${bearer}`,
      },
      body: formData,
    });
    const dataJson = (await data.json());
    console.log(dataJson);
    return dataJson;
  } catch (err) {
    return { user: default_User, userCredential: default_UserCredential };
  }
};

// Update User Profile
export const updateUserProfile = async ({
  key,
  value,
  bearer,
}: {
  key:string,
  value:string,
  bearer: string;
}): Promise<T_userLocalStorage|boolean> => {
  const url = URLBasic + "/users";

  try {
    const data = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearer}`,
      },
      body: JSON.stringify({key,value}),
    });
    const dataJson = (await data.json());
    console.log(dataJson);
    return dataJson;
  } catch (err) {
    return false;
  }
};
