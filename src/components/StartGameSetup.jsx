import {
  Box,
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { CardDataContext } from "../context/CardDataContext";
import { grey } from "@mui/material/colors";
import { Levels, Speeds } from "../constants";

const StartGameSetup = () => {
  const {
    handleStartGame,
    level,
    speed,
    handleLevelChange: setLevel,
    setSpeed,
    userName,
    updateUserName,
  } = useContext(CardDataContext);

  return (
    <Box
      id="start-game-container"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box id="level-container">
        {userName && (
          <Box mb={2}>
            <Typography
              variant="h6"
              color="white"
            >{`Are you ready, ${userName}!`}</Typography>
            <Box display="flex" alignItems="center" color="white" gap={2}>
              <Typography>Not you?</Typography>
              <Button onClick={() => updateUserName("")}>Switch User</Button>
            </Box>
          </Box>
        )}
        <FormLabel id="levels-buttons-group-label" sx={{ color: "white" }}>
          Game Grid Level
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="levels-buttons-group-label"
          name="levels-buttons-group"
          sx={{
            color: "white",
          }}
          value={level}
        >
          <FormControlLabel
            value={Levels["4x4"]}
            control={
              <Radio sx={radioStyle} onClick={() => setLevel(Levels["4x4"])} />
            }
            label="4x4"
          />
          <FormControlLabel
            value={Levels["6x6"]}
            control={
              <Radio sx={radioStyle} onClick={() => setLevel(Levels["6x6"])} />
            }
            label="6x6"
          />
          <FormControlLabel
            value={Levels["8x8"]}
            control={
              <Radio sx={radioStyle} onClick={() => setLevel(Levels["8x8"])} />
            }
            label="8x8"
          />
        </RadioGroup>
      </Box>
      <Box id="speed-container">
        <FormLabel id="speed-buttons-group-label" sx={{ color: "white" }}>
          Game Speed
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="speed-buttons-group-label"
          name="speed-buttons-group"
          sx={{
            color: "white",
          }}
          value={speed}
        >
          <FormControlLabel
            value={Speeds.slow}
            control={
              <Radio sx={radioStyle} onClick={() => setSpeed(Speeds.slow)} />
            }
            label="Slow"
          />
          <FormControlLabel
            value={Speeds.medium}
            control={
              <Radio sx={radioStyle} onClick={() => setSpeed(Speeds.medium)} />
            }
            label="Medium"
          />
          <FormControlLabel
            value={Speeds.fast}
            control={
              <Radio sx={radioStyle} onClick={() => setSpeed(Speeds.fast)} />
            }
            label="Fast"
          />
        </RadioGroup>
      </Box>
      <Button
        variant="contained"
        sx={{
          bgcolor: grey[300],
          borderRadius: 3,
          color: "black",
          "&:hover": {
            bgcolor: grey[50],
          },
        }}
        onClick={handleStartGame}
      >
        Start Game
      </Button>
    </Box>
  );
};

export { StartGameSetup };

const radioStyle = {
  color: grey[400],
  "&.Mui-checked": {
    color: grey[200],
  },
};
