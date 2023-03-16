import tw from "tailwind-styled-components";
import { ButtonGroup, Button } from "@mui/material";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import TextFieldsOutlinedIcon from '@mui/icons-material/TextFieldsOutlined';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import VideoCameraBackOutlinedIcon from '@mui/icons-material/VideoCameraBackOutlined';

const Container=tw.div``

const PostBar = () => {

  return (
    <Container>
      <ButtonGroup fullWidth variant="text" aria-label="text button group" sx={{backgroundColor:"purple",color:"white"}}>
        <Button sx={{color:"white"}}><TextFieldsOutlinedIcon/><span className="pl-2">Text</span>  </Button>
        <Button sx={{color:"white"}}><PhotoOutlinedIcon/><span className="pl-2">Photo</span>  </Button>
        <Button sx={{color:"white"}}><VideoCameraBackOutlinedIcon/><span className="pl-2">Video</span>  </Button>
        <Button type="submit" sx={{color:"purple",backgroundColor:'white',':hover':{color:'white'}}}><span className="pr-2">Post</span>  <SendOutlinedIcon sx={{color:'green'}}/></Button>
      </ButtonGroup>
    </Container>
  );
};

export default PostBar