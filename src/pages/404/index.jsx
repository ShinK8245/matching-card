import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <ErrorOutlineIcon sx={{ color: "white" }} style={{ fontSize: 50 }} />
      <Typography color={"white"} variant="subtitle1">
        This page doesn't exist...
      </Typography>
      <Button component={Link} to="/" variant="outlined">
        Back to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
