import tw from "tailwind-styled-components";
import SearchBox from "../searchBox/SearchBox";
import MainMemuBeforeLogin from "./components/MainMenuBeforeLogin";
import MainMemuAfterLogin from "./components/MainMemuAfterLogin";
import { useContext, useState } from "react";
import { authContext } from "../../contexts/authContext/AuthProvider";
import { Avatar } from "@mui/material";
import Login from "../login/Login";
import Register from "../register/Register";
import { PageStatus } from "../../pages/layout/MainLayout";

// ============== Types ===============================
// ============== Styled Components ===================
const Container = tw.div` my-1 w-full  flex flex-col justify-center items-center `;
const Logo = tw.div`text-3xl flex cursor-pointer hover:text-gray-200`;
const Wrapper = tw.div`flex w-full justify-between `;
const Panel = tw.div`w-full`;
// ============== Functions & Data ====================
// ============== Module ==============================
const Nav = ({
  // pageStatus,
  // setPageStatus,
}: {
  // pageStatus: PageStatus;
  // setPageStatus: React.Dispatch<React.SetStateAction<PageStatus>>;
}) => {
  const [pageStatus, setPageStatus] = useState(PageStatus.NORMAL);
  const authCtx = useContext(authContext);
  return (
    <Container className="text-red">
      <Wrapper>
        <Logo>
          <Avatar alt="TG" src="/tg-website-favicon-color.png" />
          Twlite
        </Logo>
        {authCtx.state.user.userCredential.isLogin ? (
          <MainMemuAfterLogin />
        ) : (
          <MainMemuBeforeLogin setPageStatus={setPageStatus} />
        )}
      </Wrapper>
      <Wrapper>
        {pageStatus == PageStatus.LOGIN && (
          <Panel>
            <Login pageStatus={pageStatus} setPageStatus={setPageStatus} />
          </Panel>
        )}
        {pageStatus == PageStatus.REGISTER && (
          <Panel>
            <Register pageStatus={pageStatus} setPageStatus={setPageStatus} />
          </Panel>
        )}
      </Wrapper>
    </Container>
  );
};
// ============== Sub Module #1 =======================

export default Nav;
