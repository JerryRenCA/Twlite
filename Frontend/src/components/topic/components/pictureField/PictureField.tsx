import { Box, TextField } from "@mui/material";
import tw from "tailwind-styled-components";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import LocalSeeOutlinedIcon from "@mui/icons-material/LocalSeeOutlined";
import { teal } from "@mui/material/colors";
import React, { useRef, useState } from "react";
// ============== Types ===============================
// ============== Styled Components ===================
const Container = tw.div` `;
const Wrapper = tw.div`flex justify-center items-center min-h-[5rem] w-full`;
const ImgTag = tw.img` rounded-xl   cursor-pointer`;
// ============== Functions & Data ====================
// ============== Module ==============================
const PictureField = React.forwardRef(
  (
    {
      picFile,
      setPicFile,
    }: {
      picFile: File | undefined;
      setPicFile: React.Dispatch<React.SetStateAction<File | undefined>>;
    },
    ref
  ) => {
    const [imagePreview, setImagePreview] = useState<string>("");
    const refImg = useRef<React.LegacyRef<HTMLImageElement> | undefined>(null);
    const clearContent = () => {setImagePreview("")};
    React.useImperativeHandle(ref, () => ({
      clearContent,
    }));
    const handlePicFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const selFile = e.target.files[0];
        if(!selFile)return;
        if (selFile.size > 1028 * 1028 * 5) {
          console.log("File Size too big:", selFile.size);
          return;
        }
        setPicFile(e.target.files[0]);
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(e.target.files[0]);

      }
    };
    return (
      <Container>
        <input
          type="file"
          id="picFileInput"
          className="invisible absolute"
          accept=".jpg, .png, .gif"
          onChange={(e) => handlePicFileChange(e)}
        />
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <LocalSeeOutlinedIcon sx={{ color: "black", mr: 1, mb: 1.3 }} />
          <Wrapper>
            <label htmlFor="picFileInput">
              <ImgTag
                src={imagePreview?imagePreview :"upload-g5930cb398_1280.png"}
                alt="Loading"
                loading="lazy"
                className={imagePreview?"w-full border-2 my-1":"w-12 border-0" }
              ></ImgTag>
            </label>
          </Wrapper>
        </Box>
      </Container>
    );
  }
);
// ============== Sub Module #1 =======================
export default PictureField;
