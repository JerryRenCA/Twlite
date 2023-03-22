import tw from "tailwind-styled-components";
import { ButtonGroup, Button, Tooltip } from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import TextFieldsOutlinedIcon from "@mui/icons-material/TextFieldsOutlined";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import VideoCameraBackOutlinedIcon from "@mui/icons-material/VideoCameraBackOutlined";
import { useState } from "react";
import { teal } from "@mui/material/colors";

const Container = tw.div`pb-1`;

const PostBar = () => {
  const [contentType,setContentType]=useState(0)
  return (
    <Container>
      <ButtonGroup
        fullWidth
        variant="text"
        aria-label="text button group"
        sx={{ backgroundColor: teal[800], color: "black",borderRadius:'6px' }}
      >
        <Button sx={{ color: "purple", ":hover": { color: "red" } }}>
          <Tooltip title="Text content." arrow>
            <TextFieldsOutlinedIcon />
          </Tooltip>
        </Button>
        <Button sx={{ color: "white", ":hover": { color: "red" } }}>
          <Tooltip title="Picture content." arrow>
            <PhotoOutlinedIcon />
          </Tooltip>
        </Button>
        <Button sx={{ color: "white", ":hover": { color: "red" } }}>
          <Tooltip title="Video content." arrow>
            <VideoCameraBackOutlinedIcon />
          </Tooltip>
        </Button>
        <Button
          type="submit"
          sx={{
            color: "red",
            fontWeight: "bold",
            backgroundColor: "black",
            ":hover": { color: "white" },
          }}
        >
          <span className="pr-2">Post</span>{" "}
          <SendOutlinedIcon sx={{ color: "green" }} />
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default PostBar;
