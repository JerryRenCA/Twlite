import { Avatar } from "@mui/material";
import { useContext, useState } from "react";
import tw from "tailwind-styled-components";
import Comment from "../comment/Comment";
import NaturePeopleOutlinedIcon from "@mui/icons-material/NaturePeopleOutlined";
import { green, grey } from "@mui/material/colors";
import StatsBar from "./components/statsBar/StatsBar";
import { authContext } from "../../contexts/authContext/AuthProvider";
import { getComments } from "../../viewModel/comment/commentVM";
import { enqueueSnackbar } from "notistack";
import { T_Topic } from "../../viewModel/topic/topicDtos";
import { T_Comment } from "../../viewModel/comment/commentDtos";
import NotesIcon from "@mui/icons-material/Notes";
import { formatDistanceToNow } from "date-fns";

// ============== Types ===============================
// ============== Styled Components ===================
const Container = tw.div`border-x-[1px] border-dashed border-gray-600`;
const Wrapper = tw.div`grid grid-cols-6`;
const LeftPanel = tw.div`p-4`;
const RightPanel = tw.div` col-span-5`;
const UserTag = tw.div`p-1 font-roboto font-bold`;
const Title = tw.div` min-h-[2rem] font-mono `;
const HalfBoder = tw.div`absolute border-t-[1px] min-h-[2rem] w-20 ml-2 border-green-400 border-dashed `;
const Content = tw.div` min-h-[6rem] px-2 pt-1 font-roboto text-gray-200 cursor-pointer`;
const CommentContainer = tw.div` `;

// ============== Functions & Data ====================
// ============== Module ==============================
const Topic = ({ topic }: { topic: T_Topic }) => {
  const [comments, setComments] = useState<T_Comment[]>([]);
  const [isOpenComments, setIsOpenComments] = useState(false);
  const authCtx = useContext(authContext);
  const handleContentClick = async (flipOpen = true) => {
    if (!isOpenComments) {
      const cmts = await getComments({
        topicId: topic.id,
        bearer: authCtx.state.user.userCredential.accessToken,
      });
      setComments(cmts);
      enqueueSnackbar("Comments refreshed!", {
        variant: "success",
        autoHideDuration: 2000,
      });
    }
    if (flipOpen) setIsOpenComments((prev) => !prev);
  };
  const handleAfterNewComment = async (newComment: T_Comment) => {
    setIsOpenComments(true);
    if (comments.length == 0) {
      await handleContentClick(false);
    } else {
      setComments((prev) => [newComment, ...prev]);
    }
  };
  return (
    <Container>
      <hr />
      <Wrapper>
        <LeftPanel>
          <Avatar sx={{ bgcolor: grey[500], cursor: "pointer" }}>
            <NaturePeopleOutlinedIcon />
          </Avatar>
        </LeftPanel>
        <RightPanel>
          <UserTag>
            {topic.userName}
            <span className="text-green-800 pl-1 font-extrabold font-sans">
              @
            </span>
            <span>{formatDistanceToNow(topic.createdAt)}</span>
          </UserTag>
          <Title>
            <NotesIcon sx={{ color: "green", marginRight: "4px" }} />
            {topic.title}
          </Title>
          <Content onClick={(e) => handleContentClick()}>
            {topic.content}
          </Content>
          <StatsBar
            topicId={topic.id}
            handleAfterNewComment={handleAfterNewComment}
          />
          {isOpenComments && (
            <CommentContainer>
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </CommentContainer>
          )}
        </RightPanel>
      </Wrapper>
    </Container>
  );
};
// ============== Sub Module #1 =======================

export default Topic;
