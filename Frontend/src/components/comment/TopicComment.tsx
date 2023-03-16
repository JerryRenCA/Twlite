import { useState } from "react";
import tw from "tailwind-styled-components";
import { T_CommentReply } from "../../data/types/commentReply";
import { T_TopicComment } from "../../data/types/topicComment";
import CommentReply from "../reply/CommentReply";

// ============== Types ===============================
// ============== Styled Components ===================
const Container = tw.div``;
// ============== Functions & Data ====================
// ============== Module ==============================
const TopicComment = ({ comment }: { comment: T_TopicComment }) => {
  const [replys, setReplys] = useState<T_CommentReply[]>([]);
  return (
    <Container>
      <div>{comment.content}</div>
      <div></div>
      <div>
        {replys.map((reply) => (
          <CommentReply reply={reply} />
        ))}
      </div>
    </Container>
  );
};
// ============== Sub Module #1 =======================
export default TopicComment;
