import React, { useContext } from "react";
import AirlineStopsIcon from "@mui/icons-material/AirlineStops";
import { CardDataContext } from "../context/CardDataContext";
import { Box, Typography } from "@mui/material";

const MoveCounter = () => {
  const { moves } = useContext(CardDataContext);

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <AirlineStopsIcon />
      <Typography> {moves}</Typography>
    </Box>
  );
};

export { MoveCounter };
