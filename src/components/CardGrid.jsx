import { Box, useMediaQuery } from "@mui/material";
import { Card } from "./Card";
import { Hint } from "./Hint";
import { useContext } from "react";
import { CardDataContext } from "../context/CardDataContext";
import { AreYouSureModal } from "./AreYouSureModal";
import theme from "../theme";

const CardGrid = () => {
  const { numberOfCards, cardData } = useContext(CardDataContext);
  const tabletOrSmaller = useMediaQuery(theme.breakpoints.down("md"));

  const columns = Math.sqrt(numberOfCards);
  const gridContainerWidth = columns * 100 + (columns - 1) * 8;
  const cardWidth = tabletOrSmaller && columns > 6 ? "80px" : "100px";

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <AreYouSureModal />
      <Hint />

      <Box
        id="card-container"
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, minmax(${cardWidth}, 1fr))`,
          gap: 1,
          justifyItems: "center",
          maxWidth: gridContainerWidth,
        }}
      >
        {cardData.map((cardDataItem) => {
          return (
            <Card key={cardDataItem.id} data={cardDataItem} size={cardWidth} />
          );
        })}
      </Box>
    </Box>
  );
};

export { CardGrid };
