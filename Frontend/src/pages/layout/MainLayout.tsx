import { ReactNode, useState } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../../components/nav/Nav";
import tw from "tailwind-styled-components";
//Type
export enum PageStatus {
  NORMAL,
  LOGIN,
  REGISTER,
}
// Styled
const Container = tw.div`flex flex-col w-full justify-center items-center`;
const Wrapper = tw.div`min-w-[20rem] w-1/2 max-w-[60rem] `;
//
const MainLayout = () => {
  
  return (
    <Container>
      <Wrapper>
        <Nav  />
        <Outlet />
      </Wrapper>
    </Container>
  );
};

export default MainLayout;
