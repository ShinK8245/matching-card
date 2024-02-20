import { Box, Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useContext, useEffect } from "react";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { CardDataContext } from "../context/CardDataContext";
import Confetti from "react-confetti";

const GameCompletion = () => {
  const {
    handleStartGame,
    diffSeconds,
    diffMinutes,
    diffHours,
    moves,
    penaltyTime,
  } = useContext(CardDataContext);

  const totalSecondsWithPenalty = diffSeconds + penaltyTime;

  const seconds =
    totalSecondsWithPenalty >= 60
      ? totalSecondsWithPenalty % 60
      : totalSecondsWithPenalty;

  const totalMinutesWithPenalty =
    totalSecondsWithPenalty >= 60 ? diffMinutes + 1 : diffMinutes;

  const minutes =
    totalMinutesWithPenalty >= 60
      ? totalMinutesWithPenalty + 1
      : totalMinutesWithPenalty;

  const hours = totalMinutesWithPenalty >= 60 ? diffHours + 1 : diffHours;

  const time = `${hours}h ${minutes}m ${seconds}s`;

  useEffect(() => {
    const bgmEffect = new Audio("/assets/sounds/finish.wav");
    bgmEffect.play();
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Typography variant="h3">🎉</Typography>
      <Typography color="white">Well done!</Typography>
      <Box>
        <Typography color="white">Time: {time}</Typography>
        <Typography color="white">Moves: {moves}</Typography>
      </Box>
      <Confetti
        numberOfPieces={5000} // You can adjust the number of confetti pieces
        recycle={false}
        gravity={0.1}
        width={window.innerWidth}
        height={window.innerHeight}
      />
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
