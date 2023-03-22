import { useState } from "react";
import tw from "tailwind-styled-components";
import { T_CommentReply } from "../../data/types/commentReply";
import { T_Comment } from "../../data/types/comment";
import CommentReply from "../reply/CommentReply";

// ============== Types ===============================
// ============== Styled Components ===================
const Container = tw.div`border-t-[1px] min-h-[2rem] p-2 border-green-100 font-mono`;
// ============== Functions & Data ====================
// ============== Module ==============================
const Comment = ({ comment }: { comment: T_Comment }) => {
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
export default Comment;
