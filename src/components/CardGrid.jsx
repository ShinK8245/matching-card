import { Box, Button } from "@mui/material";
import { Card } from "./Card";
import { useContext } from "react";
import { CardDataContext } from "../context/CardDataContext";
import { Hint } from "./Hint";
import { grey, lime } from "@mui/material/colors";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

const CardGrid = () => {
  const { handleNewGame, numberOfCards, cardData } =
    useContext(CardDataContext);

  const columns = Math.sqrt(numberOfCards);
  const gridContainerWidth = columns * 100 + (columns - 1) * 8;

  return (
    <Box display="flex" flexDirection="column" gap={2}>
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
        onClick={handleNewGame}
      >
        NEW GAME
      </Button>
      <Hint />
      <Box
        id="card-container"
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          justifyItems: "center",
          gap: 1,
          width: gridContainerWidth,
        }}
      >
        {cardData.map((cardDataItem) => {
          return <Card key={cardDataItem.id} data={cardDataItem} />;
        })}
      </Box>
    </Box>
  );
};

export { CardGrid };
