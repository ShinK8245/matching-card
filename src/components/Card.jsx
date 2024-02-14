import { Box } from "@mui/material";
import { lime } from "@mui/material/colors";
import React, { useContext, useState } from "react";
import { CardDataContext } from "../context/CardDataContext";

const Card = ({ data }) => {
  const { isFlipped, isMatched } = data;
  const { handleCardClick } = useContext(CardDataContext);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const { clientX, clientY, target } = event;
    const { left, top, width, height } = target.getBoundingClientRect();

    const x = (clientX - left - width / 2) / 10;
    const y = -(clientY - top - height / 2) / 10;

    setRotation({ x, y });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <Box
      height={100}
      width={100}
      borderRadius={3}
      sx={{
        position: "relative",
        transformStyle: "preserve-3d",
        transform: isFlipped
          ? `rotateX(${rotation.y}deg) rotateY(${
              rotation.x + (isMatched ? 0 : 180)
            }deg)`
          : `rotateX(${rotation.y}deg) rotateY(${rotation.x}deg)`,
        transition: "transform 0.5s ease-out",
        zIndex: isFlipped ? "auto" : 1,
        bgcolor: isMatched ? "transparent" : isFlipped ? "none" : "white",
        filter: isMatched ? "grayscale(100%)" : "none",
        opacity: isMatched ? 0.5 : 1,
        "&:hover": {
          bgcolor: isFlipped || isMatched ? "none" : lime[200],
        },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleCardClick(data)}
    >
      {isFlipped || isMatched ? (
        <Box
          style={{
            height: "100%",
            width: "100%",
            background: `url(${data.imageUrl})`,
            backgroundSize: "cover",
            transform: isMatched ? "rotateY(0deg)" : "rotateY(180deg)",
          }}
        ></Box>
      ) : null}
    </Box>
  );
};

export default Card;
