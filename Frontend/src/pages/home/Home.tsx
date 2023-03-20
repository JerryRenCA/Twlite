import { useContext, useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Login from "../../components/login/Login";
import Nav from "../../components/nav/Nav";
import Register from "../../components/register/Register";
import Topic from "../../components/topic/Topic";
import TopicPostPanel from "../../components/topic/TopicPostPanel";
import { authContext } from "../../contexts/authContext/AuthProvider";

import { T_Topic } from "../../data/types/topic";
import { getTopics } from "../../viewModel/topic/topicVM";

// ============== Types ===============================
export enum PageStatus {
  NORMAL,
  LOGIN,
  REGISTER,
}
// ============== Styled Components ===================
const Container = tw.div`flex flex-col justify-center items-center`;
const Wrapper = tw.div`min-w-[30rem] max-w-[40rem] border-b-[1px]`;
const Panel = tw.div``;
// ============== Functions & Data ====================
// ============== Module ==============================
const Home = () => {
  const [pageStatus, setPageStatus] = useState(PageStatus.NORMAL);
  const [topics, setTopics] = useState<T_Topic[]>([]);
  const authCtx=useContext(authContext);
  useEffect(() => {
    if(authCtx.state.isLogin)
        getTopics({bearer:authCtx.state.user.userCredential.accessToken}).then(p=>setTopics(p))
  }, []);
  return (
    <Container>
      <Wrapper>
        <Nav pageStatus={pageStatus} setPageStatus={setPageStatus} />
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
        <TopicPostPanel setTopics={setTopics}/>
        {topics&&topics.map((topic) => (
          <Topic key={topic.id} topic={topic} />
        ))}
      </Wrapper>
    </Container>
  );
};
// ============== Sub Module #1 =======================
export default Home;
