import { Backdrop, Box, Button, Typography } from "@mui/material";
import { grey, lime } from "@mui/material/colors";
import React, { useContext, useState } from "react";
import { CardDataContext } from "../context/CardDataContext";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

const AreYouSureModal = () => {
  const { handleNewGame } = useContext(CardDataContext);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <>
      <Button
        variant="outlined"
        sx={{
          borderRadius: 3,
          "&.Mui-disabled": {
            color: grey[700],
            backgroundColor: lime[100],
            border: `1px solid ${lime[100]}`,
          },
        }}
        endIcon={<SportsEsportsIcon />}
        onClick={toggleModal}
      >
        NEW GAME
      </Button>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={modalOpen}
      >
        <Box
          sx={{
            bgcolor: grey[200],
            borderRadius: 3,
            paddingTop: 4,
            paddingLeft: 3,
            paddingRight: 3,
            paddingBottom: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6">Are you sure? 👀</Typography>
          <Typography mb={3}>Your game progress will be lost! </Typography>
          <Box display="flex" gap={1}>
            <Button variant="contained" color="info" onClick={toggleModal}>
              No, back to game
            </Button>
            <Button variant="contained" color="error" onClick={handleNewGame}>
              I'm sure
            </Button>
          </Box>
        </Box>
      </Backdrop>
    </>
  );
};

export { AreYouSureModal };
