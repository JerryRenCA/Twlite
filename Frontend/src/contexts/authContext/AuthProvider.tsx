import { createContext, useReducer } from "react";
import { default_User, default_UserCredential, T_User, T_UserCredential } from "../../data/types/user";

export const USERLOCALSTORAGE = "userAuthInfo";

export type T_userLocalStorage = {
  userCredential: T_UserCredential;
  user: T_User;
};
export const default_userLocalStorage: T_userLocalStorage = {
  userCredential: default_UserCredential,
  user: default_User,
};
type T_authState = {
  user: T_userLocalStorage;
  isLogin: boolean;
};

export const default_authState = (): T_authState => {
  const val = localStorage.getItem(USERLOCALSTORAGE) as string;
  const userLocalS = JSON.parse(val);
  // console.log('From localstorage:',userLocalS)
  if (userLocalS&&userLocalS.userCredential) return { user: userLocalS, isLogin: userLocalS.uid !== "" };
  else return { user: default_userLocalStorage, isLogin: false };
};

enum AuthActionType {
  LOGIN,
  LOGOUT,
  UPDATE, // update userCollection
}

type T_authReducerActionWithPayload = {
  authActionType: AuthActionType;
  payload?: T_userLocalStorage;
};

const authReducer = (
  authState: T_authState,
  authReducerActionWithPayload: T_authReducerActionWithPayload
): T_authState => {
  switch (authReducerActionWithPayload.authActionType) {
    case AuthActionType.LOGIN: {
      if (authReducerActionWithPayload.payload) {
        // const val = JSON.stringify(authReducerActionWithPayload.payload);
        return { user: {...authReducerActionWithPayload.payload}, isLogin: true };
      } else throw new Error("No user info in payload");
    }
    case AuthActionType.UPDATE: {
      if (authReducerActionWithPayload.payload) {
        // const val = JSON.stringify(authReducerActionWithPayload.payload);
        return { user: {...authReducerActionWithPayload.payload}, isLogin: true };
      } else throw new Error("No user info in payload");
    }
    default: {//Logout
      return { user: {...default_userLocalStorage}, isLogin: false };
    }
  }
};

const useAuthContext = (authState: T_authState) => {
  const [state, dispatch] = useReducer(authReducer, authState);// here the state includes all state about user.
  const login = (userInfo: T_userLocalStorage) =>
    dispatch({ authActionType: AuthActionType.LOGIN, payload: userInfo });
  const logout = () =>
    dispatch({
      authActionType: AuthActionType.LOGOUT,
      payload: default_userLocalStorage,
    });
  const update = (userInfo: T_userLocalStorage) =>
    dispatch({
      authActionType: AuthActionType.UPDATE,
      payload: userInfo,
    });
  return { state, dispatch, login, logout, update };
};

type T_authContext = ReturnType<typeof useAuthContext>;

const default_authContext: T_authContext = {
  state: default_authState(),
  dispatch: () => {},
  login: () => {},
  logout: () => {},
  update: () => {},
};

export const authContext = createContext<T_authContext>(default_authContext);

const AuthProvider = ({ children }: { children: React.ReactElement }) => {
  return (
    <authContext.Provider value={useAuthContext(default_authState())}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;