import { Box, TextField } from "@mui/material";
import tw from "tailwind-styled-components";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { teal } from "@mui/material/colors";
import React, { useRef } from "react";
// ============== Types ===============================
// ============== Styled Components ===================
const Container = tw.div``;
// ============== Functions & Data ====================
// ============== Module ==============================
const ContentField = React.forwardRef(
  (
    {
      content,
      setContent,
    }: {
      content: string;
      setContent: React.Dispatch<React.SetStateAction<string>>;
    },
    ref
  ) => {
    const handleMaximumText = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      if (e.target.value.length > 500) {
        e.target.value = e.target.value.slice(0, 500);
      }
      setContent(e.target.value);
    };
    const refField = useRef<HTMLInputElement>(null);
    const clearContent = () => {
      if (refField.current) refField.current.value = "";
      setContent("");
    };
    React.useImperativeHandle(ref, () => ({
      clearContent,
    }));
    return (
      <Container>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <DescriptionOutlinedIcon sx={{ color: "black", mr: 1, mb: 1.3 }} />
          <TextField
            inputRef={refField}
            value={content}
            onChange={handleMaximumText}
            fullWidth
            multiline
            id="input-with-sx"
            label="Content (Optional)"
            variant="standard"
            // helperText="More information about it. Length: 0 - 500 characters."
            sx={{
              color: "white",
              "& .MuiInput-input": {
                paddingX: "1px",
                color: teal[500],
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
  }
);
// ============== Sub Module #1 =======================
export default ContentField;
