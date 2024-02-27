import { Alert, Button, Snackbar } from "@mui/material";
import { grey, lime } from "@mui/material/colors";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

import React, { useContext, useState } from "react";
import { CardDataContext } from "../context/CardDataContext";
import { SoundContext } from "../context/SoundContext";

const Hint = () => {
  const { playHintSound, cardDataUpdating } = useContext(SoundContext);

  const { handleHintClick, maxNumberOfHints } = useContext(CardDataContext);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [hints, setHints] = useState(maxNumberOfHints);
  const onHintClick = () => {
    playHintSound();
    setOpenSnackbar(true);
    setHints((prev) => prev - 1);
    handleHintClick();
  };
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<TipsAndUpdatesIcon />}
        onClick={onHintClick}
        disabled={hints === 0 || cardDataUpdating}
        sx={{
          borderRadius: 3,
          "&.Mui-disabled": {
            color: grey[700],
            backgroundColor: lime[100],
            border: `1px solid ${lime[100]}`,
          },
        }}
      >
        Hint ({`${hints} left`})
      </Button>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={1500}
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          3 seconds added to a penalty time!
        </Alert>
      </Snackbar>
    </>
  );
};

export { Hint };
