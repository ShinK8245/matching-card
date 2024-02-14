import { createContext, useState, useEffect } from "react";
import { generateCardData } from "../utils";

const CardDataContext = createContext();

const CardDataContextProvider = ({ children }) => {
  const numberOfCards = 36;
  const [cardData, setCardData] = useState(generateCardData(numberOfCards));
  const [flippedCards, setFlippedCards] = useState([]);
  const [isClickable, setIsClickable] = useState(true);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      const match = firstCard.imageUrl === secondCard.imageUrl;

      const timer = setTimeout(() => {
        const updatedCardData = cardData.map((cardItem) => {
          if (cardItem.id === firstCard.id || cardItem.id === secondCard.id) {
            return {
              ...cardItem,
              isFlipped: match,
            };
          }
          return cardItem;
        });

        setCardData(updatedCardData);
        setFlippedCards([]);
        setIsClickable(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [flippedCards, cardData]);

  const handleCardClick = (card) => {
    if (isClickable && !card.isFlipped && flippedCards.length < 2) {
      const updatedCardData = cardData.map((cardItem) => ({
        ...cardItem,
        isFlipped: cardItem.id === card.id ? true : cardItem.isFlipped,
      }));

      setCardData(updatedCardData);
      setFlippedCards((prevFlippedCards) => [...prevFlippedCards, card]);

      if (flippedCards.length === 1) {
        setIsClickable(false);
      }
    }
  };

  return (
    <CardDataContext.Provider
      value={{
        numberOfCards,
        cardData,
        handleCardClick,
      }}
    >
      {children}
    </CardDataContext.Provider>
  );
};

export { CardDataContextProvider, CardDataContext };
