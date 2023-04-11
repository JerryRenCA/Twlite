import {
    Avatar,
    CircularProgress,
    IconButton,
    Tooltip,
  } from "@mui/material";
  import { deepOrange } from "@mui/material/colors";
  import React, { useContext, useEffect, useState } from "react";
  import tw from "tailwind-styled-components";
import TextFWithUBtn from "../../components/shared/formFields/textFWithUBtn/TextFWithUBtn";

  import {
    authContext,
    default_authState,
  } from "../../contexts/authContext/AuthProvider";
import { getAvatarUrl } from "../../viewModel/url/urlVM";
import { updateUserAvatar } from "../../viewModel/user/userVM";

  
  // Types
  // Styled Components
  const Container = tw.div`w-full flex justify-center items-center`;
  const Wrapper = tw.div`border-2 my-6 w-full rounded-lg p-2 grid grid-cols-1 gap-3`;
  const Title = tw.div`text-3xl py-4`;
  // Functions
  // Module
  const Profile = () => {
    const [selFile, setSelFile] = useState<File>();
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [urlUploadedFile, setUrlUploadedFile] = useState<string>("");
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) setSelFile(e.target.files[0]);
    };
    const authCtx = useContext(authContext);
    const uid = authCtx.state.user.user.id;
    useEffect(() => {
      if (selFile)
        updateUserAvatar({file:selFile, bearer:authCtx.state.user.userCredential.accessToken});
    }, [selFile]);
    console.log("profile::",authCtx.state.user)
    return (
      <Container>
        <Wrapper>
          <div className="flex justify-center items-center">
            <Title>Profile</Title>
            <IconButton
              color="primary"
              aria-label="upload avatar"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleFileChange}
              />
              <Tooltip title="Update profile avatar">
                <div className="relative">
                  <Avatar
                    sx={{ bgcolor: deepOrange[500], margin: 1 }}
                    alt="Avatar"
                    src={ getAvatarUrl(authCtx.state.user.user.avatar)}
                  />
                  {uploadProgress != 0 && uploadProgress != 100 && (
                    <div className="absolute top-2 left-2">
                      <CircularProgress
                        color="info"
                        variant="determinate"
                        value={uploadProgress}
                      />
                    </div>
                  )}
                </div>
              </Tooltip>
            </IconButton>
          </div>
          <TextFWithUBtn
            title="Email"
            readonly
            value={
              authCtx.state.user.userCredential
                ? authCtx.state.user.user.email
                : ""
            }
            colName="email"
            uid={uid}
          />
          <TextFWithUBtn
            title="Display Name"
            value={authCtx.state.user.user.firstName}
            colName="firstName"
            uid={uid}
          />

          <TextFWithUBtn
            title="Distinct Name"
            value={authCtx.state.user.user.lastName}
            colName="lastName"
            uid={uid}
          />
        </Wrapper>
      </Container>
    );
  };
  export default Profile;