import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { lime } from "@mui/material/colors";
import { CardDataContext } from "../context/CardDataContext";
import { differenceInHours, differenceInMinutes } from "date-fns";

const Navbar = () => {
  const { startedTimeStamp, handleNewGame } = useContext(CardDataContext);
  const [diffSeconds, setDiffSeconds] = useState(0);
  const [diffMinutes, setDiffMinutes] = useState(0);
  const [diffHours, setDiffHours] = useState(0);

  useEffect(() => {
    if (startedTimeStamp) {
      const interval = setInterval(() => {
        const currentTimeStamp = new Date();

        // const currentDiffSeconds =
        //   differenceInSeconds(currentTimeStamp, startedTimeStamp) % 60;

        const currentDiffMinutes =
          differenceInMinutes(currentTimeStamp, startedTimeStamp) % 60;

        const currentDiffHours = differenceInHours(
          currentTimeStamp,
          startedTimeStamp
        );

        if (currentDiffHours !== diffHours) {
          setDiffHours(currentDiffHours);
        }

        if (currentDiffMinutes !== diffMinutes) {
          setDiffMinutes(currentDiffMinutes);
        }

        setDiffSeconds((prev) => {
          if (prev === 59) {
            return 0;
          } else {
            return prev + 1;
          }
        });
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startedTimeStamp]);

  const getTimerDisplayValue = () => {
    let displayValue = `${diffSeconds}s`;

    if (diffMinutes > 0) {
      displayValue = `${diffMinutes}m ${diffSeconds}s`;
    }

    if (diffHours > 0) {
      displayValue = `${diffHours}h ${diffMinutes}m ${diffSeconds}s`;
    }

    return displayValue;
  };

  return (
    <AppBar position="static" sx={{ bgcolor: lime[800] }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box id="navbar-left">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Button color="inherit" sx={{ mx: 1 }} onClick={handleNewGame}>
            NEW GAME
          </Button>
        </Box>
        <Box id="navbar-right">
          {startedTimeStamp && (
            <Typography>Timer: {getTimerDisplayValue()}</Typography>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
