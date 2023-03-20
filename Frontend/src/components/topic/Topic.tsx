import { Avatar } from "@mui/material";
import { useState } from "react";
import tw from "tailwind-styled-components";
import { T_Topic } from "../../data/types/topic";
import { T_TopicComment } from "../../data/types/topicComment";
import TopicComment from "../comment/TopicComment";
import NaturePeopleOutlinedIcon from "@mui/icons-material/NaturePeopleOutlined";
import { green, grey } from "@mui/material/colors";
import ReplyBar from "./components/replyBar/ReplyBar";
// ============== Types ===============================
// ============== Styled Components ===================
const Container = tw.div`border-x-[1px] border-dashed border-gray-600`;
const Wrapper = tw.div`grid grid-cols-6`;
const LeftPanel = tw.div`p-4`;
const RightPanel = tw.div` col-span-5`;
const Title = tw.div` border-b-[1px] min-h-[2rem] p-2 border-gray-600`;
const Content = tw.div` min-h-[6rem] px-2 pt-1`;
const CommentContainer = tw.div``;

// ============== Functions & Data ====================
// ============== Module ==============================
const Topic = ({ topic }: { topic: T_Topic }) => {
  const [comments, setComments] = useState<T_TopicComment[]>([]);

  return (
    <Container>
      <hr />
      <Wrapper>
        <LeftPanel>
          <Avatar sx={{ bgcolor: grey[500],cursor:'pointer' }}>
            <NaturePeopleOutlinedIcon />
          </Avatar>
        </LeftPanel>
        <RightPanel>
          <Title>{topic.title}</Title>
          <Content>{topic.content}</Content>
          <ReplyBar />
          <CommentContainer>
            {comments.map((comment) => (
              <TopicComment comment={comment} />
            ))}
          </CommentContainer>
        </RightPanel>
      </Wrapper>
    </Container>
  );
};
// ============== Sub Module #1 =======================

export default Topic;
