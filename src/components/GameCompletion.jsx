import { Box, Button, Typography } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import React, { useContext, useEffect } from "react";
import { CardDataContext } from "../context/CardDataContext";
import { LeaderBoard } from "./LeaderBoard";
import { Levels } from "../constants";
import { grey } from "@mui/material/colors";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import Confetti from "react-confetti";
import { ASSETS_URL } from "../constants/env";

const GameCompletion = () => {
  const {
    handleStartGame,
    handleNewGame,
    timeTakenDisplayValue,
    moves,
    level,
    fourLeaderBoard,
    sixLeaderBoard,
    eightLeaderBoard,
  } = useContext(CardDataContext);
  const leaderBoardData = {
    [Levels["4x4"].label]: fourLeaderBoard,
    [Levels["6x6"].label]: sixLeaderBoard,
    [Levels["8x8"].label]: eightLeaderBoard,
  };

  useEffect(() => {
    const bgmEffect = new Audio(`${ASSETS_URL}/sounds/finish.wav`);
    bgmEffect.play();
  }, []);

  return (
    <Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Typography variant="h3">🎉</Typography>
        <Typography color="white">Well done!</Typography>
        <Box>
          <Typography color="white">Time: {timeTakenDisplayValue}</Typography>
          <Typography color="white">Moves: {moves}</Typography>
        </Box>
        <Confetti
          numberOfPieces={5000}
          recycle={false}
          gravity={0.1}
          width={window.innerWidth}
          height={window.innerHeight}
        />
        <Box display="flex" gap={2}>
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
            endIcon={<SportsEsportsIcon />}
            onClick={handleNewGame}
          >
            NEW GAME
          </Button>
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
      </Box>
      <LeaderBoard level={level.label} data={leaderBoardData[level.label]} />
    </Box>
  );
};

export { GameCompletion };
