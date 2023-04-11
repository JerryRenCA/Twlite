import { Button } from "@mui/material";
import { teal } from "@mui/material/colors";
import { useContext, useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Login from "../../components/login/Login";
import Nav from "../../components/nav/Nav";
import Register from "../../components/register/Register";
import Topic from "../../components/topic/Topic";
import TopicPostPanel from "../../components/topic/TopicPostPanel";
import { authContext } from "../../contexts/authContext/AuthProvider";
import { default_fetch_meta, T_fetch_meta } from "../../data/types/dataConfig";
import { T_Topic } from "../../viewModel/topic/topicDtos";

import { getTopics } from "../../viewModel/topic/topicVM";

// ============== Types ===============================

// ============== Styled Components ===================
const Container = tw.div`flex flex-col w-full justify-center items-center`;
const Wrapper = tw.div`w-full`;

const MoreTag = tw.form`mb-4`;
// ============== Functions & Data ====================
// ============== Module ==============================
const Home = () => {
  const [topics, setTopics] = useState<T_Topic[]>([]);
  const [pageParams, setPageParams] =
    useState<T_fetch_meta>(default_fetch_meta);
  const authCtx = useContext(authContext);
  useEffect(() => {
    if (authCtx.state.isLogin)
      getTopics({
        bearer: authCtx.state.user.userCredential.accessToken,
        pageSearchParams: pageParams,
      }).then((p) => {
        setTopics((prev) => [...p.data]);
        setPageParams({ ...p.meta, page: p.meta.page + 1 });
        // console.log(topics);
      });
    else setTopics([]);
  }, [authCtx.state.user]);
  const handleGetMoreTopic = () => {
    // console.log("pageParams::", pageParams);
    if (pageParams.hasNextPage) {
      setPageParams({ ...pageParams, page: pageParams.page + 1 });
      getTopics({
        bearer: authCtx.state.user.userCredential.accessToken,
        pageSearchParams: pageParams,
      }).then((p) => {
        setTopics((prev) => [...prev, ...p.data]);
        // console.log("tt:", topics, p.data);
        setPageParams({ ...p.meta, page: p.meta.page + 1 });
      });
    }
  };
  return (
    <Container>
      <Wrapper>
        <TopicPostPanel
          topicId=""
          topicLevel={0}
          setChildTopics={setTopics}
          handleAfterNewComment={async () => {}}
        />
        {topics &&
          topics.map((topic, idx) => (
            <Topic key={topic.id + idx} topic={topic} topicLevel={0} />
          ))}
        <MoreTag>
          <Button
            onClick={handleGetMoreTopic}
            fullWidth
            sx={{
              backgroundColor: teal[900],
              color: "white",
              ":hover": { backgroundColor: teal[700] },
            }}
          >
            More...
          </Button>
        </MoreTag>
      </Wrapper>
    </Container>
  );
};
// ============== Sub Module #1 =======================
export default Home;
