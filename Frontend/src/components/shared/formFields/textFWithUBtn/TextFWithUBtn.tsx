import { Button, TextField, Tooltip } from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import tw from "tailwind-styled-components";
import UpgradeIcon from "@mui/icons-material/Upgrade";

import { useSnackbar } from "notistack";
import {
  authContext,
  default_authState,
} from "../../../../contexts/authContext/AuthProvider";
import { teal } from "@mui/material/colors";
import { T_User } from "../../../../data/types/user";
import { updateUserProfile } from "../../../../viewModel/user/userVM";
// Types
// Styled Components
const Container = tw.div` flex justify-center items-center bg-red-400`;
const Wrapper = tw.div`max-w-[60rem] min-w-[20rem] flex items-center bg-red-200 px-4 my-1 rounded-lg`;
//   const WrapperFields = tw.div`flex items-center`;
// Functions
// Module
const TextFWithUBtn = ({
  title,
  value,
  uid,
  readonly,
  colName,
  collectionName,
}: {
  title: string;
  value: string | null;
  readonly?: boolean;
  uid: string;
  colName: string;
  collectionName?: string;
}) => {
  const authCtx = useContext(authContext);
  const [val, setVal] = useState("");
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleOnChange = () => {
    if (inputRef.current) setVal(inputRef.current.value);
  };
  const handleUpdate = async () => {
    const rzlt= await updateUserProfile({
      key: colName,
      value: val,
      bearer: authCtx.state.user.userCredential.accessToken,
    });
    if(rzlt==false){
        enqueueSnackbar("Update fail! ", { variant: "error" });
        return;
    }
    const key = colName as keyof T_User;
    const user_localStorage = default_authState().user;
    const userCollection: any = user_localStorage.user;
    userCollection[key] = val;
    const user_localStorageNew = {
      ...user_localStorage,
      userCollection: { ...userCollection },
    };

    if (user_localStorage) authCtx.update(user_localStorageNew);

    enqueueSnackbar("Update successfully!", { variant: "success" });
  };

  return (
    <Container>
      <Wrapper>
        <div className="grow">
          <TextField
            inputRef={inputRef}
            fullWidth
            id="standard-basic"
            label={title}
            variant="standard"
            disabled={readonly}
            defaultValue={value}
            onChange={handleOnChange}
            sx={{
              ":disabled": {
                color: "white",
              },
            //   paddingX:'4px',
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
        </div>

        <div className=" self-end">
          <Tooltip
            title={readonly ? "" : "Update"}
            sx={{
              opacity: readonly ? 0 : 100,
              cursor: readonly ? "default" : "pointer",
            }}
          >
            <>
              <Button
                size="small"
                onClick={handleUpdate}
                sx={{
                  opacity: readonly ? 0 : 100,
                  cursor: readonly ? "default" : "pointer",
                }}
              >
                <UpgradeIcon />
              </Button>
            </>
          </Tooltip>
        </div>
      </Wrapper>
    </Container>
  );
};
export default TextFWithUBtn;
