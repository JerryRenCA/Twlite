import { Box, TextField } from "@mui/material";
import tw from "tailwind-styled-components";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import { useEffect, useRef, useState } from "react";
import { teal } from "@mui/material/colors";
// ============== Types ===============================
// ============== Styled Components ===================
const Container = tw.div`grow flex`;
// ============== Functions & Data ====================
// ============== Module ==============================
const CommentContentField = ({
  setContent,
  content,
  inputRef,
}: {
  setContent: React.Dispatch<React.SetStateAction<string>>;
  content:string,
  inputRef:React.RefObject<HTMLInputElement>;
}) => {
  const handleMaximumText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value.length > 500) {
      e.target.value = e.target.value.slice(0, 500);
    }
    setContent(e.target.value);
  };

  return (
    <Container>
        <div className=" self-center">
          <DescriptionRoundedIcon
            sx={{ color: "black", mx: 1, }}
          />
        </div>
      <Box sx={{ display: "flex", alignItems: "flex-top",flexGrow:1 }}>
        <TextField
          inputRef={inputRef}
          value={content}
          onChange={handleMaximumText}
          fullWidth
          multiline
          id="input-with-sx"
          label="Reply"
          variant="standard"
          helperText=""
          sx={{
            "& .MuiInput-input": {
              paddingX: "1px",
              color: teal[600],
              borderBottomWidth: "1px",
            },
            "& .MuiFormLabel-root": {
              color: "white",
            },
            "& .MuiFormHelperText-root": {
              color: "gray",
            },
          }}
        />
      </Box>
    </Container>
  );
};
// ============== Sub Module #1 =======================
export default CommentContentField;
