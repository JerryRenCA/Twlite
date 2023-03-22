import { Box, TextField } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, { useContext, useEffect, useRef, useState } from "react";
import tw from "tailwind-styled-components";
import { authContext } from "../../contexts/authContext/AuthProvider";
import { T_Topic } from "../../data/types/topic";
import { T_topicNewDto } from "../../viewModel/topic/topicDtos";
import { createTopic } from "../../viewModel/topic/topicVM";
import ContentField from "./components/contentField/ContentField";
import PostBar from "./components/postBar/PostBar";
import TitleField from "./components/titleField/TitleField";

// ============== Types ===============================
// ============== Styled Components ===================
const Container = tw.div`flex justify-center items-center bg-slate-300 rounded-t-lg`;
const Form = tw.form`w-[35rem] border-x-[0px] border-dashed border-gray-600`;
const Title = tw.div`m-4 text-center text-3xl font-playfair `;
const FieldWrapper = tw.div`mx-4 my-1`;
// ============== Functions & Data ====================
// ============== Module ==============================
const TopicPostPanel = ({
  setTopics,
}: {
  setTopics: React.Dispatch<React.SetStateAction<T_Topic[]>>;
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [reset, setReset] = useState(false);
  const topicNewDto: T_topicNewDto = {
    title: "",
    content: "",
  };
  const titleChildRef = React.useRef<any>(null);
  const contentChildRef = React.useRef<any>(null);

  const handleClearFields = () => {
    if (titleChildRef && titleChildRef.current)
      titleChildRef.current.clearTitle();
    if (contentChildRef && contentChildRef.current)
      contentChildRef.current.clearContent();
  };
  useEffect(() => {
    (topicNewDto.title = title), (topicNewDto.content = content);
  }, [title, content]);
  const authCtx = useContext(authContext);
  const handlePostNew = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(topicNewDto);
    if (title.trim() == "" || content.trim() == "") return;
    createTopic({
      topicNew: topicNewDto,
      bearer: authCtx.state.user.userCredential.accessToken,
    }).then((p) => {
      setTopics((prev) => [p, ...prev]);
    });
    enqueueSnackbar("Post successfully!", {
      variant: "success",
      autoHideDuration: 2000,
    });
    handleClearFields();
  };

  return (
    <Container>
      <Form onSubmit={(e) => handlePostNew(e)}>
        <FieldWrapper>
          <TitleField title={title} setTitle={setTitle} ref={titleChildRef} />
        </FieldWrapper>
        <FieldWrapper>
          <ContentField
            content={content}
            setContent={setContent}
            ref={contentChildRef}
          />
        </FieldWrapper>
        <FieldWrapper>
          <PostBar />
        </FieldWrapper>
      </Form>
    </Container>
  );
};
// ============== Sub Module #1 =======================
export default TopicPostPanel;
