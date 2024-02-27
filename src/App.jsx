import { useContext } from "react";
import { CardGrid } from "./components/CardGrid";
import Navbar from "./components/Navbar";
import { CardDataContext } from "./context/CardDataContext";
import { Box, Typography } from "@mui/material";
import { GameCompletion } from "./components/GameCompletion";
import { StartGameSetup } from "./components/StartGameSetup";
import { WelcomeModal } from "./components/WelcomeModal";
import { Route, Routes } from "react-router-dom";

function App() {
  const { gameStarted, gameCompleted } = useContext(CardDataContext);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route
            index
            element={
              <>
                <Box
                  id="main-container"
                  display="flex"
                  justifyContent="center"
                  my={5}
                >
                  {gameStarted && <CardGrid />}
                  {gameCompleted && <GameCompletion />}
                  {!gameStarted && !gameCompleted && <StartGameSetup />}
                </Box>
                <WelcomeModal />
              </>
            }
          />
          <Route
            path="leaderboard"
            element={<Typography color="white">LeaderBoard Screen</Typography>}
          />

          <Route
            path="*"
            element={<Typography color="white">404 Not Found</Typography>}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
