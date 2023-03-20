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

const Container = tw.div`pr-4 pb-2`;
const StatsTag = tw.div`pl-2`;

const ReplyBar = () => {
  return (
    <Container>
      <ButtonGroup
        fullWidth
        variant="text"
        aria-label="text button group"
        sx={{ backgroundColor: "black", color: "white",height:'1.5rem' }}
      >
        <Button sx={{ color: "white",":hover":{color:'red'} }}>
          <Tooltip title="Reply" arrow>
            <ReplyOutlinedIcon sx={{}} />
          </Tooltip>
          <StatsTag>1.5M</StatsTag>
        </Button>
        <Button sx={{ color: "white",":hover":{color:'red'} }}>
          <Tooltip title="Like" arrow>
            <FavoriteBorderOutlinedIcon />
          </Tooltip>
          <StatsTag>1.5M</StatsTag>
        </Button>
        <Button sx={{ color: "white",":hover":{color:'red'} }}>
          <Tooltip title="Share" arrow>
            <ShareOutlinedIcon />
          </Tooltip>
          <StatsTag>1.5M</StatsTag>
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default ReplyBar;
