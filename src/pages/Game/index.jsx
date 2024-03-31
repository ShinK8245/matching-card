import React, { useContext } from "react";
import { CardDataContext } from "../../context/CardDataContext";
import { GameCompletion } from "../../components/GameCompletion";
import { CardGrid } from "../../components/CardGrid";
import { StartGameSetup } from "../../components/StartGameSetup";
import { WelcomeModal } from "../../components/WelcomeModal";
import { Typography, useMediaQuery } from "@mui/material";
import theme from "../../theme";

const GamePage = () => {
  const { gameStarted, gameCompleted } = useContext(CardDataContext);
  const smallDevice = useMediaQuery(theme.breakpoints.down("sm"));

  if (smallDevice) {
    return (
      <Typography color="white" px={5} variant="subtitle1">
        Sorry, this game is not supported on small devices. 😣
        <br />
        Please use a tablet or desktop to play 👍
      </Typography>
    );
  }

  return (
    <>
      {gameStarted && <CardGrid />}
      {gameCompleted && <GameCompletion />}
      {!gameStarted && !gameCompleted && <StartGameSetup />}
      <WelcomeModal />
    </>
  );
};

export default GamePage;
