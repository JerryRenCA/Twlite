import { Box, TextField } from '@mui/material'
import tw from 'tailwind-styled-components'
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
// ============== Types ===============================
// ============== Styled Components ===================
const Container=tw.div``
// ============== Functions & Data ====================
// ============== Module ==============================
const ContentField = ({setContent}:{setContent:React.Dispatch<React.SetStateAction<string>>}) => {
    const handleMaximumText = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        if (e.target.value.length > 500) {
          e.target.value = e.target.value.slice(0, 500);
        }
        setContent(e.target.value)
      };
    return (
        <Container>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <DescriptionRoundedIcon sx={{ color: "white", mr: 1, mb: 3.3 }} />
            <TextField
              onChange={handleMaximumText}
              fullWidth
              multiline
              id="input-with-sx"
              label="Content (Optional)"
              variant="standard"
              helperText="More information about it. Length: 0 - 500 characters."
              sx={{
                color: "white",
                "& .MuiInput-input": {
                    paddingX:'1px',
                  color: "#ccc",
                  borderBottomWidth: "1px",
                  // borderBottomStyle: "dot",
                  // borderBottomColor: "grey",
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
export default ContentField