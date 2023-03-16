import { useContext, useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { authContext } from "../../contexts/authContext/AuthProvider";
import { PageStatus } from "../../pages/home/Home";
import {
  T_userInfoLoginDto,
} from "../../viewModel/user/userDtos";
import { login } from "../../viewModel/user/userVM";
import EmailField from "../shared/formFields/emailField/EmailField";
import PasswordField from "../shared/formFields/passwordField/PasswordField";

// ============== Types ===============================
// ============== Styled Components ===================
const Container = tw.div` transition-all duration-500`;
const Wrapper = tw.div`p-4 border-x-[1px] border-dashed border-gray-400`;
// ============== Functions & Data ====================
// ============== Module ==============================
const Login = ({
  pageStatus,
  setPageStatus,
}: {
  pageStatus: PageStatus;
  setPageStatus: React.Dispatch<React.SetStateAction<PageStatus>>;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userLoginDto: T_userInfoLoginDto = {
    email: "",
    password: "",
  };
  useEffect(() => {
    userLoginDto.email = email;
    userLoginDto.password = password;
  }, [email, password]);
  const [loginErr, setLoginErr] = useState(false);

  const authCtx = useContext(authContext);
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginRzlt = await login(userLoginDto);
    console.log("login:", loginRzlt);
    if (loginRzlt.user.id) {
      authCtx.login(loginRzlt);
      setPageStatus(PageStatus.NORMAL);
    } else setLoginErr(true);
  };
  return (
    <Container>
      <Wrapper>
        <form onSubmit={handleLogin}>
          <div className="text-2xl text-center font-satisfy ">Login</div>
          <EmailField setEmail={setEmail} />
          <PasswordField setPassword={setPassword} />
          <button
            type="submit"
            className=" bg-primary-purple w-full my-2 h-12 rounded-lg text-white hover:bg-primary-purple-lighter"
          >
            Login
          </button>
        </form>
      </Wrapper>
    </Container>
  );
};
// ============== Sub Module #1 =======================
export default Login;
