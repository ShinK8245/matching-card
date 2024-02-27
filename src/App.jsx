import { useContext } from "react";
import { CardGrid } from "./components/CardGrid";
import Navbar from "./components/Navbar";
import { CardDataContext } from "./context/CardDataContext";
import { Typography } from "@mui/material";
import { GameCompletion } from "./components/GameCompletion";
import { StartGameSetup } from "./components/StartGameSetup";
import { WelcomeModal } from "./components/WelcomeModal";
import { Route, Routes } from "react-router-dom";
import LeaderboardPage from "./pages/Leaderboard";
import SoundControl from "./components/SoundControl";

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
                {gameStarted && <CardGrid />}
                {gameCompleted && <GameCompletion />}
                {!gameStarted && !gameCompleted && <StartGameSetup />}
                <WelcomeModal />
              </>
            }
          />
          <Route path="leaderboard" element={<LeaderboardPage />} />

          <Route
            path="*"
            element={<Typography color="white">404 Not Found</Typography>}
          />
        </Route>
      </Routes>
      <SoundControl />
    </>
  );
}

export default App;
