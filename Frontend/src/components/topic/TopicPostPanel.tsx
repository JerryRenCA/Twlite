import { Box, TextField } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, { useContext, useEffect, useRef, useState } from "react";
import tw from "tailwind-styled-components";
import { authContext } from "../../contexts/authContext/AuthProvider";
import { T_Topic, T_topicNewDto } from "../../viewModel/topic/topicDtos";
import { createTopic } from "../../viewModel/topic/topicVM";
import ContentField from "./components/contentField/ContentField";
import PictureField from "./components/pictureField/PictureField";
import PostBar from "./components/postBar/PostBar";
import TitleField from "./components/titleField/TitleField";

// ============== Types ===============================
// ============== Styled Components ===================
const Container = tw.div`flex justify-center items-center bg-slate-300 rounded-t-lg`;
const Form = tw.form`w-full border-x-[0px] border-dashed border-gray-600`;
const Title = tw.div`m-4 text-center text-3xl font-playfair `;
const FieldWrapper = tw.div`mx-4 my-1`;
const PostWrapper = tw.div``;
// ============== Functions & Data ====================
// ============== Module ==============================
const TopicPostPanel = ({
  topicId,
  topicLevel,
  setChildTopics,
  handleAfterNewComment,
}: {
  topicId: string;
  topicLevel: number;
  setChildTopics: React.Dispatch<React.SetStateAction<T_Topic[]>>;
  handleAfterNewComment: (newComment: T_Topic) => Promise<void>;
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [contentType, setContentType] = useState("A"); // A:Text; B:Picture; C:Video
  const [picFile, setPicFile] = useState<File>();

  const titleChildRef = React.useRef<any>(null);
  const contentChildRef = React.useRef<any>(null);
  const picChildRef = React.useRef<any>(null);

  const handleClearFields = () => {
    if (titleChildRef && titleChildRef.current)
      titleChildRef.current.clearTitle();
    if (contentChildRef && contentChildRef.current)
      contentChildRef.current.clearContent();
    if (picChildRef && picChildRef.current) picChildRef.current.clearContent();
  };

  const authCtx = useContext(authContext);

  // add New Topic
  const handlePostNew = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() == "") {
      enqueueSnackbar("Fail to post! Title is empty!", {
        variant: "error",
        autoHideDuration: 3000,
      });
      return;
    }
    createTopic({
      topicNew: { title, content, contentType, picFile: "", parentId: topicId },
      file: picFile,
      bearer: authCtx.state.user.userCredential.accessToken,
    }).then((p) => {
      console.log("topicLevel", topicLevel);
      if (topicLevel == 0)
        setChildTopics((prev) => [
          { ...p, userName: authCtx.state.user.user.firstName },
          ...prev,
        ]);
      handleAfterNewComment({
        ...p,
        userName: authCtx.state.user.user.firstName,
      });
    });
    enqueueSnackbar("Post successfully!", {
      variant: "success",
      autoHideDuration: 3000,
    });
    handleClearFields();
  };

  return (
    <Container>
      <Form onSubmit={(e) => handlePostNew(e)}>
        <FieldWrapper>
          <TitleField title={title} setTitle={setTitle} ref={titleChildRef} />
        </FieldWrapper>
        {contentType == "A" && (
          <FieldWrapper>
            <ContentField
              content={content}
              setContent={setContent}
              ref={contentChildRef}
            />
          </FieldWrapper>
        )}
        {contentType == "B" && (
          <FieldWrapper>
            <PictureField
              picFile={picFile}
              setPicFile={setPicFile}
              ref={picChildRef}
            />
          </FieldWrapper>
        )}
        <PostWrapper>
          <PostBar {...{ contentType, setContentType }} />
        </PostWrapper>
      </Form>
    </Container>
  );
};
// ============== Sub Module #1 =======================
export default TopicPostPanel;
