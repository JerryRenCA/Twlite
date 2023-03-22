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
import { useState } from "react";

import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentContentField from "../../../comment/components/CommentContentField";
import NewComment from "../../../comment/NewComment";
import { T_Comment } from "../../../../data/types/comment";

const Container = tw.div`pr-4 pb-2`;
const StatsTag = tw.div`pl-2`;

const StatsBar = ({
  topicId,
  handleAfterNewComment,
}: {
  topicId: string;
  handleAfterNewComment: (newComment: T_Comment) => Promise<void>;
}) => {
  const [showNewComment, setShowNewComment] = useState(false);
  const [favorite, setFavorite] = useState(false);

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
          onClick={() => setShowNewComment((prev) => !prev)}
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
      {showNewComment && <NewComment topicId={topicId} handleAfterNewComment={handleAfterNewComment}/>}
    </Container>
  );
};

export default StatsBar;
