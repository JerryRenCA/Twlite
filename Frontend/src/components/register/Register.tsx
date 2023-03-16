import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import { authContext } from "../../contexts/authContext/AuthProvider";
import { PageStatus } from "../../pages/home/Home";
import { T_userInfoRegisterDto } from "../../viewModel/user/userDtos";

import {
  login,
  register,
} from "../../viewModel/user/userVM";
import EmailField from "../shared/formFields/emailField/EmailField";
import PasswordField from "../shared/formFields/passwordField/PasswordField";

// ============== Types ===============================
// ============== Styled Components ===================
const Container = tw.div` transition-all duration-500`;
const Wrapper = tw.div`p-4 border-x-[1px] border-dashed border-gray-400`;
const ErrTag=tw.div`text-sm text-red-700 pl-4`
// ============== Functions & Data ====================
// ============== Module ==============================
const Register = ({
    pageStatus,
    setPageStatus,
  }: {
    pageStatus: PageStatus;
    setPageStatus: React.Dispatch<React.SetStateAction<PageStatus>>;
  }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerErr, setRegisterErr] = useState(false);
  const userRegister: T_userInfoRegisterDto = {
    firstName: "jerry",
    lastName: "ren",
    email: "",
    password: "",
    phone: "(+86)(123)123-4567",
  };
  useEffect(() => {
    userRegister.email = email
    userRegister.password = password;
    console.log("userRegister:",userRegister)

  }, [email, password]);

  
  const authCtx = useContext(authContext);
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(email==""||password==""){
        return;
    }
    const loginRzlt = await register(userRegister);
    console.log("Register:", loginRzlt);
    if (loginRzlt.user.id) {
      authCtx.login(loginRzlt);
      setPageStatus(PageStatus.NORMAL)
    } else setRegisterErr(true);
  };
  return (
    <Container>
      <Wrapper>
        <form onSubmit={handleRegister}>
          <div className="text-2xl text-center font-satisfy ">Register</div>
          <EmailField setEmail={setEmail}/>
          <PasswordField setPassword={setPassword}/>
        {registerErr&&<ErrTag>Register fail.</ErrTag>}
          <button
            type="submit"
            className=" bg-primary-purple w-full my-2 h-12 rounded-lg text-white hover:bg-primary-purple-lighter"
          >
            Register
          </button>
        </form>
      </Wrapper>
    </Container>
  );
};
// ============== Sub Module #1 =======================
export default Register;
