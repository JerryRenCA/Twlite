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
          <TitleRoundedIcon sx={{ color: "black", mr: 1, mb: 1.3 }} />
          <TextField
            inputRef={refField}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            multiline
            id="input-with-sx"
            label=" Wag somthing ..."
            variant="standard"
            // helperText="Post something. Length: 1 - 100 characters."
            sx={{
              "& .MuiInput-input": {
                color: teal[500],
                paddingX: "1px",
                borderBottomWidth:"0px",
                outlineWidth:"0px",
              },
              "& .MuiFormLabel-root": {
                color: "white",
                borderBottomWidth:"0px",
                outlineWidth:"0px",
              },
              "& .MuiTextField-root": {
                color: "red",
                borderBottomWidth:"0px",
                outlineWidth:"0px",
              },
              "& .MuiFormHelperText-root": {
                color: "gray",
              },
              borderBottomWidth:"0px",
              outlineWidth:"0px",
            }}
          />
        </Box>
      </Container>
    );
  }
);
// ============== Sub Module #1 =======================
export default TitleField;
