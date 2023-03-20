import { Box, TextField } from '@mui/material'
import tw from 'tailwind-styled-components'
import TitleRoundedIcon from "@mui/icons-material/TitleRounded";
import { useRef, useState } from 'react';

// ============== Types ===============================
// ============== Styled Components ===================
const Container=tw.div``
// ============== Functions & Data ====================
// ============== Module ==============================
const TitleField = ({setTitle}:{setTitle:React.Dispatch<React.SetStateAction<string>>}) => {
    const refField=useRef<HTMLDivElement>(null);
    return (
        <Container>
            <Box sx={{ display: "flex", alignItems: "flex-end", color: "white" }}>
            <TitleRoundedIcon sx={{ color: "white", mr: 1, mb: 3.3 }} />
            <TextField
              ref={refField}
              onChange={(e)=>setTitle(e.target.value)}
              fullWidth
              multiline
              id="input-with-sx"
              label=" wag wag ..."
              variant="standard"
              helperText="Post something. Length: 1 - 100 characters."
              sx={{
                "& .MuiInput-input": {
                  color: "#ccc",
                  paddingX:'1px',
                  borderBottomWidth: "1px",
                  borderBottomStyle: "dotted",
                  borderBottomColor: "grey",
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
    )
}
// ============== Sub Module #1 =======================
export default TitleField