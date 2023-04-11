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
import { getTopics } from "../../viewModel/topic/topicVM";
import PictureField from "./components/pictureField/PictureField";
import { getAvatarUrl, getPicUrl } from "../../viewModel/url/urlVM";

// ============== Types ===============================
// ============== Styled Components ===================
const Container = tw.div`border-x-[1px] border-dashed border-gray-600`;
const Wrapper = tw.div`flex`;
const LeftPanel = tw.div` pt-6 pr-4 w-[7rem] flex justify-center`;
const RightPanel = tw.div` grow`;
const WrapperStatsTag = tw.div``;
const UserTag = tw.div`p-1 font-roboto font-bold`;
const Title = tw.div` min-h-[2rem] font-mono `;
const Content = tw.div` min-h-[3rem] px-2 pt-1 font-roboto text-gray-200 cursor-pointer`;
const ImgDiv = tw.div` min-h-[3rem] max-h-[40rem] rounded-lg  px-2 mb-2 overflow-hidden cursor-pointer flex justify-center`;
const ImgTag = tw.img` object-contain max-h-[40rem]  rounded-lg `;
const CommentContainer = tw.div` `;

// ============== Functions & Data ====================
// ============== Module ==============================
const Topic = ({
  topic,
  topicLevel,
}: {
  topic: T_Topic;
  topicLevel: number;
}) => {
  const [childTopics, setChildTopics] = useState<T_Topic[]>([]);
  const [isOpenComments, setIsOpenComments] = useState(false);
  const authCtx = useContext(authContext);
  // open child list
  const handleContentClick = async (flipOpen = true) => {
    if (!isOpenComments) {
      const cmts = await getTopics({
        topicId: topic.id,
        bearer: authCtx.state.user.userCredential.accessToken,
      });
      setChildTopics(cmts.data);
      enqueueSnackbar("Comments refreshed!", {
        variant: "success",
        autoHideDuration: 2000,
      });
    }
    if (flipOpen) setIsOpenComments((prev) => !prev);
  };

  // after add new topic
  const handleAfterNewComment = async (newComment: T_Topic) => {
    setIsOpenComments(true);
    if (childTopics.length == 0) {
      await handleContentClick(false);
    } else {
      setChildTopics((prev) => [newComment, ...prev]);
    }
  };
  // console.log(getPicUrl(topic.picFile));
  // console.log(topic);
  return (
    <Container>
      <hr />
      <Wrapper>
        <LeftPanel>
          <Avatar sx={{ bgcolor: grey[500], cursor: "pointer" }} src={getAvatarUrl(topic.avatar)}>
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
          {topic.contentType == "A" && (
            <Content onClick={(e) => handleContentClick()}>
              {topic.content}
            </Content>
          )}
          {topic.contentType == "B" && topic.picFile && (
            <ImgDiv>
              <ImgTag src={getPicUrl(topic.picFile)} alt="pic file" />
            </ImgDiv>
          )}
          <WrapperStatsTag>
            <StatsBar
              topicId={topic.id}
              topicLevel={topicLevel + 1}
              setChildTopics={setChildTopics}
              handleAfterNewComment={handleAfterNewComment}
            />
          </WrapperStatsTag>
          {isOpenComments && (
            <CommentContainer>
              {childTopics.map((topic) => (
                <Topic
                  key={topic.id}
                  topic={topic}
                  topicLevel={topicLevel + 1}
                />
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
