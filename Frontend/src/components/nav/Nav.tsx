import tw from "tailwind-styled-components";
import SearchBox from "../searchBox/SearchBox";
import MainMemuBeforeLogin from "./components/MainMenuBeforeLogin";
import MainMemuAfterLogin from "./components/MainMemuAfterLogin";
import { PageStatus } from "../../pages/home/Home";
import { useContext } from "react";
import { authContext } from "../../contexts/authContext/AuthProvider";
import { Avatar } from "@mui/material";

// ============== Types ===============================
// ============== Styled Components ===================
const Container = tw.div`h-[4rem] w-full border-b-[0px] border-white flex flex-col justify-center items-center`;
const Wrapper = tw.div`flex w-full justify-between`;
const Logo = tw.div`text-3xl flex cursor-pointer hover:text-gray-200`;
// ============== Functions & Data ====================
// ============== Module ==============================
const Nav = ({
  pageStatus,
  setPageStatus,
}: {
  pageStatus: PageStatus;
  setPageStatus: React.Dispatch<React.SetStateAction<PageStatus>>;
}) => {
  const authCtx = useContext(authContext);
  return (
    <Container className="text-red">
      <Wrapper>
        <Logo><Avatar alt="TG" src="/tg-website-favicon-color.png" />Twlite</Logo>
        {authCtx.state.user.userCredential.isLogin ? (
          <MainMemuAfterLogin />
        ) : (
          <MainMemuBeforeLogin   
          setPageStatus={setPageStatus}/>
        )}
      </Wrapper>
    </Container>
  );
};
// ============== Sub Module #1 =======================

export default Nav;
