import React, { useContext, useEffect, useState } from "react";
import { CardDataContext } from "../context/CardDataContext";
import { differenceInHours, differenceInMinutes } from "date-fns";
import { Box, Typography } from "@mui/material";
import { Timer as TimerIcon } from "@mui/icons-material";

const Timer = () => {
  const { startedTimeStamp } = useContext(CardDataContext);
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
    startedTimeStamp && (
      <Box display="flex" alignItems="center" gap={1}>
        <TimerIcon />
        <Typography> {getTimerDisplayValue()}</Typography>
      </Box>
    )
  );
};

export { Timer };
