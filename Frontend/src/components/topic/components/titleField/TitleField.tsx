import { Box, TextField } from "@mui/material";
import tw from "tailwind-styled-components";
import TitleRoundedIcon from "@mui/icons-material/TitleRounded";
import React, { useRef, useState } from "react";
import { teal } from "@mui/material/colors";

// ============== Types ===============================
// ============== Styled Components ===================
const Container = tw.div``;
// ============== Functions & Data ====================
// ============== Module ==============================
const TitleField = React.forwardRef(
  (
    {
      title,
      setTitle,
    }: {
      title: string;
      setTitle: React.Dispatch<React.SetStateAction<string>>;
    },
    ref
  ) => {
    const refField = useRef<HTMLInputElement>(null);
    const clearTitle = () => {
      if (refField.current) refField.current.value = "";
      setTitle("");
    };
    React.useImperativeHandle(ref, () => ({
      clearTitle,
    }));
    return (
      <Container>
        <Box sx={{ display: "flex", alignItems: "flex-end", color: "white" }}>
          <TitleRoundedIcon sx={{ color: "black", mr: 1, mb: 3.3 }} />
          <TextField
            inputRef={refField}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            multiline
            id="input-with-sx"
            label=" Wag somthing ..."
            variant="standard"
            helperText="Post something. Length: 1 - 100 characters."
            sx={{
              "& .MuiInput-input": {
                color: teal[500],
                paddingX: "1px",
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
export default TitleField;
