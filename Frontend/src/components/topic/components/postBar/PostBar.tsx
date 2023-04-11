import tw from "tailwind-styled-components";
import { ButtonGroup, Button, Tooltip } from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import TextFieldsOutlinedIcon from "@mui/icons-material/TextFieldsOutlined";

import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import VideoCameraBackOutlinedIcon from "@mui/icons-material/VideoCameraBackOutlined";
import { teal } from "@mui/material/colors";

const Container = tw.div`pt-2 `;

const PostBar = ({
  contentType,
  setContentType,
}: {
  contentType:string;
  setContentType:React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Container>
      <ButtonGroup
        fullWidth
        variant="text"
        aria-label="text button group"
        sx={{ backgroundColor: teal[800], color: "black", borderRadius: "0px" }}
      >
        <Button sx={{ color: contentType=="A"?"purple":"white", ":hover": { color: "red" } }} onClick={()=>setContentType("A")}>
          <Tooltip title="Text content." arrow>
            <TextFieldsOutlinedIcon />
          </Tooltip>
        </Button>

        <Button sx={{ color: contentType=="B"?"purple":"white", ":hover": { color: "red" } }} onClick={()=>setContentType("B")}>
          <Tooltip title="Picture content." arrow>
              <PhotoOutlinedIcon />
          </Tooltip>
        </Button>

        <input
          type="file"
          id="videoFileInput"
          className="invisible absolute"
          accept=".mp4, .avi, .wmv"
          // onChange={handleVideoFileChange}
        />

        <Button sx={{ color: contentType=="C"?"purple":"white", ":hover": { color: "red" } }} onClick={()=>setContentType("C")}>
          <Tooltip title="Video content." arrow>
            <label htmlFor="videoFileInput">
              <VideoCameraBackOutlinedIcon />
            </label>
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
