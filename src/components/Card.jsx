import { Box } from "@mui/material";
import React from "react";
import { lime } from "@mui/material/colors";

const Card = () => {
  return (
    <Box
      height={100}
      width={100}
      bgcolor={"black"}
      borderRadius={1}
      sx={{
        "&:hover": {
          bgcolor: lime[100],
        },
      }}
    >
      <img src={"/assets/23.png"} alt={"card1"} loading="lazy" height="100%" />
    </Box>
  );
};

export default Card;
