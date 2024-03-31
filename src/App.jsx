import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import LeaderboardPage from "./pages/Leaderboard";
import SoundControl from "./components/SoundControl";
import NotFoundPage from "./pages/404";
import GamePage from "./pages/Game";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<GamePage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      <SoundControl />
    </>
  );
}

export default App;
