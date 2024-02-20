import { Button } from "@mui/base";
import { Backdrop, Box, TextField, Typography } from "@mui/material";
import { grey, lime } from "@mui/material/colors";
import React, { useContext, useState } from "react";
import { CardDataContext } from "../context/CardDataContext";
import { SoundContext } from "../context/SoundContext";

const WelcomeModal = () => {
  const { userName, updateUserName } = useContext(CardDataContext);
  const { playBackgroundMusic } = useContext(SoundContext);

  const [userNameInputValue, setUserNameInputValue] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleUserNameUpdate = () => {
    const currentUserNameValue = userNameInputValue.trim();
    if (currentUserNameValue) {
      updateUserName(currentUserNameValue);
      playBackgroundMusic();
      setUserNameInputValue("");
    } else {
      setHasError(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleUserNameUpdate();
    }
  };

  return (
    <Backdrop
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={!userName}
    >
      <Box
        sx={{
          bgcolor: grey[200],
          borderRadius: 3,
          paddingTop: 4,
          paddingLeft: 3,
          paddingRight: 3,
          paddingBottom: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6">Hi there! 👋</Typography>
        <Box>
          <Typography>Welcome to Flip Match! </Typography>
          <Typography>Enter your name below to start. </Typography>
        </Box>
        <TextField
          id="username-input"
          label="Your Name / Nickname"
          variant="standard"
          value={userNameInputValue}
          onChange={(e) => {
            if (hasError) setHasError(false);
            setUserNameInputValue(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          error={hasError}
          //   helperText={
          //     hasError ? "Please enter your name / Nickname" : undefined
          //   }
        />
        <Button
          variant="contained"
          onClick={handleUserNameUpdate}
          style={{
            backgroundColor: lime[700],
            color: "black",
            fontWeight: "bold",
            borderRadius: 5,
            padding: 9,
            borderColor: lime[700],
          }}
        >
          Let's Go!
        </Button>
      </Box>
    </Backdrop>
  );
};

export { WelcomeModal };
