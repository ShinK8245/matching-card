import { createContext, useEffect, useState } from "react";
import { generateCardData } from "../utils";
import { Levels, Speeds } from "../constants";

const CardDataContext = createContext();

const CardDataContextProvider = ({ children }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const [level, setLevel] = useState(Levels["4x4"]);
  const [speed, setSpeed] = useState(Speeds.slow);

  const [cardData, setCardData] = useState(generateCardData(level));
  const [flippedCard, setFlippedCard] = useState(null);

  const [startedTimeStamp, setStartedTimeStamp] = useState(null);
  const [diffSeconds, setDiffSeconds] = useState(0);
  const [diffMinutes, setDiffMinutes] = useState(0);
  const [diffHours, setDiffHours] = useState(0);

  const [counter, setCounter] = useState({
    steps: 0,
    moves: 0,
  });

  useEffect(() => {
    const numberOfUnmatchedCards = cardData.filter(
      (cardItem) => !cardItem.isMatched
    ).length;
    if (numberOfUnmatchedCards === 0) {
      setGameCompleted(true);
      setGameStarted(false);
    }
  }, [cardData]);

  const handleStartGame = () => {
    setStartedTimeStamp(new Date());
    setGameStarted(true);
    setGameCompleted(false);
    const newCardData = generateCardData(level);
    setCardData(newCardData);
    setFlippedCard(null);
    setDiffSeconds(0);
    setDiffMinutes(0);
    setDiffHours(0);
    setCounter({
      steps: 0,
      moves: 0,
    });
  };

  const handleNewGame = () => {
    setGameStarted(false);
    setGameCompleted(false);
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

    setCounter((prev) => {
      return {
        steps: prev.steps + 1,
        moves: (prev.steps + 1) % 2 === 0 ? prev.moves + 1 : prev.moves,
      };
    });

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
        gameCompleted,
        numberOfCards: level,
        cardData,
        level,
        speed,
        moves: counter.moves,

        startedTimeStamp,
        diffSeconds,
        setDiffSeconds,
        diffMinutes,
        setDiffMinutes,
        diffHours,
        setDiffHours,

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
