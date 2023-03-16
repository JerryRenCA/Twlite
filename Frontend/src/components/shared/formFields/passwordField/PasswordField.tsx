import { Box, TextField } from "@mui/material";
import tw from "tailwind-styled-components";
import TitleRoundedIcon from "@mui/icons-material/TitleRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useEffect, useState } from "react";
import validatorjs from "validator";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// ============== Types ===============================
// ============== Styled Components ===================
const Container = tw.div``;
const FieldWrapper = tw.div`m-4`;
const ErrTag = tw.div`text-red-500`;
// ============== Functions & Data ====================
const handleChange = (value: string) => {
  const upperCaseRegex = /^[A-Z]$/;
  const lowerCaseRegex = /^[a-z]$/;
  const symbolRegex = /^[-#!$@£%^&*()_+|~=`{}\[\]:";'<>?,.\/ ]$/;
  const numberRegex = /^[0-9]$/;
  const regRzlt = [false, false, false, false];
  Array.from(value).forEach((char) => {
    regRzlt[0] ||= upperCaseRegex.test(char);
    regRzlt[1] ||= lowerCaseRegex.test(char);
    regRzlt[2] ||= symbolRegex.test(char);
    regRzlt[3] ||= numberRegex.test(char);
  });
  const checkVal = [validatorjs.isLength(value, { min: 8 }), ...regRzlt];
  return checkVal;
};
// ============== Module ==============================
const PasswordField = ({
  setPassword,
}: {
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [valid, setValid] = useState<boolean[]>([]);
  const [pwdVisible, setPwdVisible] = useState(false);
  const [value, setValue] = useState("");
  const fieldErr = [
    " At least 8 characters",
    " 1 uppercase",
    " 1 lowercase",
    " 1 symbol",
    " 1 number",
  ];

  useEffect(() => {
    const vld=handleChange(value)
    setValid(vld);
    const rzlt = vld.reduce((rzlt, v) => rzlt && v, true);
    if (rzlt) setPassword(value);
  }, [value]);

  return (
    <Container>
      <FieldWrapper>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <LockOutlinedIcon sx={{ color: "white", mr: 1, mb: 3.3 }} />

          <TextField
            fullWidth
            id="input-with-sx"
            label="Password*"
            type={pwdVisible ? "password" : "text"}
            variant="standard"
            helperText="Please input your password."
            onChange={(e) => {setValue(e.target.value)}}

            sx={{
              color: "white",
              "& .MuiInput-input": {
                color: "white",
                borderBottomWidth: "1px",
                borderBottomStyle: "solid",
                borderBottomColor: "white",
              },
              "& .MuiFormLabel-root": {
                color: "white",
              },
              "& .MuiFormHelperText-root": {
                color: "gray",
              },
            }}
          />

          <div
            className="mr-2 cursor-pointer text-gray-400"
            onClick={(e) => setPwdVisible((prev) => !prev)}
          >
            {pwdVisible ? (
              <VisibilityIcon sx={{ color: "white", mr: 1, mb: 3.3 }} />
            ) : (
              <VisibilityOffIcon sx={{ color: "gray", mr: 1, mb: 3.3 }} />
            )}
          </div>
        </Box>
      </FieldWrapper>
      {value.trim() == "" ||
        fieldErr.map((err, id) => {
          const color = valid[id] ? " text-green-600" : "text-red-600";
          const marker = valid[id] ? "✓" : "✘";
          return (
            <div key={id}>
              <div className={color}>
                {marker} {err}
              </div>{" "}
            </div>
          );
        })}
    </Container>
  );
};
// ============== Sub Module #1 =======================
export default PasswordField;
