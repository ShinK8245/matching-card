import { Box, Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useContext } from "react";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { CardDataContext } from "../context/CardDataContext";

const GameCompletion = () => {
  const { handleStartGame, diffSeconds, diffMinutes, diffHours, moves } =
    useContext(CardDataContext);

  const time = `${diffHours}h ${diffMinutes}m ${diffSeconds}s`;
  //   const moves = 15;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Typography variant="h3">🎉</Typography>
      <Typography color="white">You've done it</Typography>
      <Box>
        <Typography color="white">Time: {time}</Typography>
        <Typography color="white">Moves: {moves}</Typography>
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
        endIcon={<RestartAltIcon />}
        onClick={handleStartGame}
      >
        Play Again
      </Button>
    </Box>
  );
};

export { GameCompletion };
