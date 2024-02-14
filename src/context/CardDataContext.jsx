import { createContext, useState } from "react";
import { generateCardData } from "../utils";
import { Levels, Speeds } from "../constants";

const CardDataContext = createContext();

const CardDataContextProvider = ({ children }) => {
  const [gameStarted, setGameStarted] = useState(false);

  const [level, setLevel] = useState(Levels["4x4"]);
  const [speed, setSpeed] = useState(Speeds.slow);

  const [cardData, setCardData] = useState(generateCardData(level));
  const [flippedCard, setFlippedCard] = useState(null);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleNewGame = () => {
    setGameStarted(false);
    const newCardData = generateCardData(level);
    setCardData(newCardData);
    setFlippedCard(null);
  };

  const handleCardClick = (card) => {
    // if we clicked on the same card, don't take any action
    if (flippedCard && card.id === flippedCard.id) {
      return;
    }

    // if there's already 2 cards that's flipped, we don't take any actions
    const numberOfFlippedCards = cardData.filter(
      (cardItem) => cardItem.isFlipped
    ).length;
    if (numberOfFlippedCards >= 2) {
      return;
    }

    // update the card data to flip the card
    const updatedCardData = cardData.map((cardItem) => {
      if (cardItem.id === card.id) {
        return {
          ...cardItem,
          isFlipped: true,
        };
      }
      // return the cardItem as is
      return cardItem;
    });
    setCardData(updatedCardData);

    // if there's no flippedCard yet, we're gonna update that, and that's it
    if (!flippedCard) {
      setFlippedCard(card);
      return;
    }

    // handle the situation where there's already a flippedCard
    if (flippedCard.imageUrl === card.imageUrl) {
      // match
      const updatedCardData = cardData.map((cardItem) => {
        if (cardItem.id === card.id || cardItem.id === flippedCard.id) {
          return {
            ...cardItem,
            isMatched: true,
            isFlipped: false,
          };
        }
        // return the cardItem as is
        return cardItem;
      });

      setTimeout(() => {
        setCardData(updatedCardData);
      }, speed);
    } else {
      // no match
      // reset the data back to original
      const updatedCardData = cardData.map((cardItem) => {
        return {
          ...cardItem,
          isFlipped: false,
        };
      });

      setTimeout(() => {
        setCardData(updatedCardData);
      }, speed);
    }
    // rest
    setFlippedCard(null);
  };

  const handleLevelChange = (newLevel) => {
    setLevel(newLevel);
    const newCardData = generateCardData(newLevel);
    setCardData(newCardData);
  };

  return (
    <CardDataContext.Provider
      value={{
        gameStarted,
        numberOfCards: level,
        cardData,
        level,
        speed,
        handleLevelChange,
        setSpeed,
        handleStartGame,
        handleNewGame,
        handleCardClick,
      }}
    >
      {children}
    </CardDataContext.Provider>
  );
};

export { CardDataContextProvider, CardDataContext };
