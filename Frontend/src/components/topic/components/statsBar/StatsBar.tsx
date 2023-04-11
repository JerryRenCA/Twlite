import tw from "tailwind-styled-components";
import { ButtonGroup, Button, Tooltip } from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import TextFieldsOutlinedIcon from "@mui/icons-material/TextFieldsOutlined";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import VideoCameraBackOutlinedIcon from "@mui/icons-material/VideoCameraBackOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { grey } from "@mui/material/colors";
import { useContext, useEffect, useState } from "react";

import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentContentField from "../../../comment/components/CommentContentField";
import NewComment from "../../../comment/NewComment";
import { T_Comment } from "../../../../viewModel/comment/commentDtos";
import { T_Topic } from "../../../../viewModel/topic/topicDtos";
import TopicPostPanel from "../../TopicPostPanel";
import { globalStateContext } from "../../../../contexts/globalStateContext/GlobalStateContext";

const Container = tw.div``;
const StatsTag = tw.div`pl-2`;

const StatsBar = ({
  topicId,
  topicLevel,
  setChildTopics,
  handleAfterNewComment,
}: {
  topicId: string;
  topicLevel:number,
  setChildTopics: React.Dispatch<React.SetStateAction<T_Topic[]>>;
  handleAfterNewComment: (newComment: T_Topic) => Promise<void>;
}) => {
  const [showNewComment, setShowNewComment] = useState(false);
  const [realShowNewComment, setRealShowNewComment] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const globalStateCtx = useContext(globalStateContext);
  useEffect(() => {
    setShowNewComment(false);
  }, [globalStateCtx.state]);
  const handleOpenNewTopicPanle = () => {
    globalStateCtx.setState((prev) => {
      return { ...prev, hasOpenedNewTopicPanel: false };
    });
    setTimeout(() => {
      setRealShowNewComment((prev) => !prev);
      setShowNewComment(realShowNewComment);
    }, 0);
  };
  return (
    <Container>
      <ButtonGroup
        fullWidth
        variant="text"
        aria-label="text button group"
        sx={{ backgroundColor: "black", color: "white", height: "1.5rem" }}
      >
        <Button
          sx={{ color: "white", ":hover": { color: "red" } }}
          onClick={handleOpenNewTopicPanle}
        >
          <Tooltip title="Reply" arrow>
            <ReplyOutlinedIcon />
          </Tooltip>
          <StatsTag>1.5M</StatsTag>
        </Button>
        <Button
          sx={{ color: "white", ":hover": { color: "red" } }}
          onClick={() =>
            setFavorite((prev) => {
              console.log(prev);
              return !prev;
            })
          }
        >
          <Tooltip title={favorite ? "Unlike" : "Like"} arrow>
            <div className="flex">
              {favorite ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}

              <StatsTag>1.5M</StatsTag>
            </div>
          </Tooltip>
        </Button>
        <Button sx={{ color: "white", ":hover": { color: "red" } }}>
          <Tooltip title="Share" arrow>
            <ShareOutlinedIcon />
          </Tooltip>
          <StatsTag>1.5M</StatsTag>
        </Button>
      </ButtonGroup>
      {topicLevel<3 && showNewComment && (
        <TopicPostPanel
        topicLevel={topicLevel}
          topicId={topicId}
          setChildTopics={setChildTopics}
          handleAfterNewComment={handleAfterNewComment}
        />
      )}
    </Container>
  );
};

export default StatsBar;
