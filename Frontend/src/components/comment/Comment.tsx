import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import tw from "tailwind-styled-components";
import { T_CommentReply } from "../../data/types/commentReply";
import { T_Comment } from "../../viewModel/comment/commentDtos";
import CommentReply from "../reply/CommentReply";
import NotesIcon from "@mui/icons-material/Notes";
// ============== Types ===============================
// ============== Styled Components ===================
const Container = tw.div`border-t-[1px] min-h-[2rem] p-2 border-green-100 font-mono`;
const UserTag = tw.div`p-1 font-roboto font-bold`;
// ============== Functions & Data ====================
// ============== Module ==============================
const Comment = ({ comment }: { comment: T_Comment }) => {
  const [replys, setReplys] = useState<T_CommentReply[]>([]);
  // console.log("Atttt:",comment.createdAt)
  return (
    <Container>
      <UserTag>
        {comment.userName}
        <span className="text-green-700 px-1 font-extrabold font-sans">@</span>
        <span>{formatDistanceToNow(comment.createdAt)}</span>
      </UserTag>

      <div className="flex">
        <NotesIcon sx={{ color: "green", marginRight: "4px" }} />
        <div>
          {comment.content.split("\n").map((i, key) => {
            return <div key={key}>{i}</div>;
          })}
        </div>
      </div>
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
