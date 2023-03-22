import React, { useContext, useRef, useState } from "react";
import tw from "tailwind-styled-components";

import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import CommentContentField from "./components/CommentContentField";
import { Button } from "@mui/material";
import { createComment } from "../../viewModel/comment/commentVM";
import { T_commentNewDto } from "../../viewModel/comment/commentDtos";
import { authContext } from "../../contexts/authContext/AuthProvider";
import { enqueueSnackbar } from "notistack";
import { T_Comment } from "../../data/types/comment";

// ============== Types ===============================

// ============== Styled Components ===================
const Container = tw.form`flex bg-slate-400 rounded-t-lg py-2`;
const ReplyBtn = tw.div` self-center px-3 cursor-pointer `;
// ============== Functions & Data ====================
// ============== Module ==============================
const NewComment = ({
  topicId,
  handleAfterNewComment,
}: {
  topicId: string;
  handleAfterNewComment: (newComment: T_Comment) => Promise<void>;
}) => {
  const [content, setContent] = useState("");
  const authCtx = useContext(authContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClearField=()=>{
    setContent('');
    if(inputRef.current)
    inputRef.current.value = '';
  }
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log("S1:", content, topicId);
    if (content.trim() == "") return;
    const commentNew: T_commentNewDto = {
      content,
      topicId,
    };
    if (authCtx.state.isLogin) {
      const cmt = await createComment({
        commentNew,
        bearer: authCtx.state.user.userCredential.accessToken,
      });
      handleAfterNewComment(cmt)
      enqueueSnackbar("Reply successfully!", { variant: "success" });
      handleClearField();
    }
  };
  return (
    <Container>
      <CommentContentField setContent={setContent} content={content} inputRef={inputRef}/>
      <Button onClick={(e) => handleSubmit(e)}>
        <span className="uppercase text-red-500 font-bold hover:text-white pr-2 text-sm">
          Reply
        </span>
        <SendOutlinedIcon sx={{ color: "green" }} />
      </Button>
    </Container>
  );
};
// ============== Sub Module #1 =======================
export default NewComment;
