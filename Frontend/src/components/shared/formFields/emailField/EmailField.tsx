import { Box, TextField } from "@mui/material";
import tw from "tailwind-styled-components";
import TitleRoundedIcon from "@mui/icons-material/TitleRounded";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useEffect, useState } from "react";
import validatorjs from "validator";
// ============== Types ===============================
// ============== Styled Components ===================
const Container = tw.div``;
const FieldWrapper = tw.div`m-4`;
const ErrTag = tw.div`text-red-500`;
// ============== Functions & Data ====================
const checkValid = (value: string) => {
  return value.trim() == "" || validatorjs.isEmail(value);
};
// ============== Module ==============================
const EmailField = ({setEmail}:{setEmail:React.Dispatch<React.SetStateAction<string>>}) => {
  const [valid, setValid] = useState(true);
  const [value, setValue] = useState("");
  useEffect(() => {
    const vld=checkValid(value)
    setValid(vld);
    if(vld)setEmail(value)
  }, [value]);
  return (
    <Container>
      <FieldWrapper>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <EmailOutlinedIcon sx={{ color: "white", mr: 1, mb: 3.3 }} />
          <TextField
            fullWidth
            id="input-with-sx"
            label="Email*"
            variant="standard"
            helperText="Please input your email."
            onChange={(e) => setValue(e.target.value)}
            sx={{
              color: "white",
              '& .MuiInput-input': {
                color: "white",
                borderBottomWidth:'1px',
                borderBottomStyle:'solid',
                borderBottomColor:"white"
              },
              '& .MuiFormLabel-root': {
                color: "white",
              },
              '& .MuiFormHelperText-root': {
                color: "gray",
              },
            }}
          />
        </Box>
      </FieldWrapper>
      {valid || <ErrTag>Please input valid email.</ErrTag>}
    </Container>
  );
};
// ============== Sub Module #1 =======================
export default EmailField;
