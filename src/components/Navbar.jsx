import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import { lime } from "@mui/material/colors";
import { CardDataContext } from "../context/CardDataContext";
import { Timer } from "./Timer";
import { MoveCounter } from "./MoveCounter";
import { Link, Outlet } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

const Navbar = () => {
  const { gameStarted, gameCompleted } = useContext(CardDataContext);

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: lime[800] }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box id="navbar-left" display="flex" gap={2}>
            <Button
              component={Link}
              to="/"
              color="inherit"
              startIcon={<HomeIcon />}
            >
              Home
            </Button>

            <Button
              component={Link}
              to="/leaderboard"
              color="inherit"
              startIcon={<LeaderboardIcon />}
            >
              LeaderBoard
            </Button>
          </Box>
          <Typography
            variant="h6"
            color="inherit"
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: gameStarted ? "center" : "right",
              marginRight: gameStarted ? 5 : 0,
            }}
          >
            FLIP MATCH
          </Typography>

          <Box id="navbar-right" display="flex" gap={2} alignItems="center">
            {gameStarted && !gameCompleted && (
              <>
                <MoveCounter />
                <Timer />
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box id="main-container" display="flex" justifyContent="center" my={5}>
        <Outlet />
      </Box>
    </>
  );
};

export default Navbar;
