import { createContext, useContext, useEffect, useState } from "react";
import { generateCardData, generateRandomNumber } from "../utils";
import { Levels, Speeds } from "../constants";
import { SoundContext } from "./SoundContext";

const CardDataContext = createContext();

const CardDataContextProvider = ({ children }) => {
  const { playSuccessSound, playFailedSound, playBackgroundMusic } =
    useContext(SoundContext);

  const [userName, setUserName] = useState(null);

  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const [level, setLevel] = useState(Levels["4x4"]);
  const [speed, setSpeed] = useState(Speeds.slow);

  const [cardData, setCardData] = useState(
    generateCardData(level.numberOfCards)
  );
  const [flippedCard, setFlippedCard] = useState(null);
  const [cardDataUpdating, setCardDataUpdating] = useState(false);

  const [startedTimeStamp, setStartedTimeStamp] = useState(null);
  const [diffSeconds, setDiffSeconds] = useState(0);
  const [diffMinutes, setDiffMinutes] = useState(0);
  const [diffHours, setDiffHours] = useState(0);
  const [penaltyTime, setPenaltyTime] = useState(0);
  const [timeTakenDisplayValue, setTimeTakenDisplayValue] = useState(null);

  const [fourLeaderBoard, setFourLeaderBoard] = useState(null);
  const [sixLeaderBoard, setSixLeaderBoard] = useState(null);
  const [eightLeaderBoard, setEightLeaderBoard] = useState(null);

  const [counter, setCounter] = useState({
    steps: 0,
    moves: 0,
  });

  const saveLeaderBoardData = (data) => {
    switch (level.label) {
      case "4x4":
        setFourLeaderBoard(data);
        window.localStorage.setItem(
          "reboot-memory-game-leaderboard-4x4",
          JSON.stringify(data)
        );
        break;
      case "6x6":
        setSixLeaderBoard(data);
        window.localStorage.setItem(
          "reboot-memory-game-leaderboard-6x6",
          JSON.stringify(data)
        );
        break;
      case "8x8":
        setEightLeaderBoard(data);
        window.localStorage.setItem(
          "reboot-memory-game-leaderboard-8x8",
          JSON.stringify(data)
        );
        break;
      default:
        break;
    }
  };

  const getLeaderBoardData = () => {
    const fourLeaderBoardData = JSON.parse(
      window.localStorage.getItem("reboot-memory-game-leaderboard-4x4")
    );
    const sixLeaderBoardData = JSON.parse(
      window.localStorage.getItem("reboot-memory-game-leaderboard-6x6")
    );
    const eightLeaderBoardData = JSON.parse(
      window.localStorage.getItem("reboot-memory-game-leaderboard-8x8")
    );

    setFourLeaderBoard(fourLeaderBoardData);
    setSixLeaderBoard(sixLeaderBoardData);
    setEightLeaderBoard(eightLeaderBoardData);
  };

  const updateLeaderBoard = (time) => {
    let leaderBoard;
    switch (level.label) {
      case "4x4":
        leaderBoard = fourLeaderBoard;
        break;
      case "6x6":
        leaderBoard = sixLeaderBoard;
        break;
      case "8x8":
        leaderBoard = eightLeaderBoard;
        break;
      default:
        break;
    }

    if (leaderBoard) {
      const newLeaderBoard = [...leaderBoard, { name: userName, time: time }];
      const sortedLeaderBoard = newLeaderBoard.sort((a, b) => a.time - b.time);
      saveLeaderBoardData(sortedLeaderBoard);
    } else {
      saveLeaderBoardData([{ name: userName, time: time }]);
    }
  };

  const prepareGameCompletionData = () => {
    const totalSecondsWithPenalty = diffSeconds + penaltyTime;

    const seconds =
      totalSecondsWithPenalty >= 60
        ? totalSecondsWithPenalty % 60
        : totalSecondsWithPenalty;

    const totalMinutesWithPenalty =
      totalSecondsWithPenalty >= 60 ? diffMinutes + 1 : diffMinutes;

    const minutes =
      totalMinutesWithPenalty >= 60
        ? totalMinutesWithPenalty % 60
        : totalMinutesWithPenalty;

    const hours = totalMinutesWithPenalty >= 60 ? diffHours + 1 : diffHours;
    const displayValue = `${hours}hr ${minutes}m ${seconds}s`;
    setTimeTakenDisplayValue(displayValue);

    const totalTimeTakenInSeconds = seconds + minutes * 60 + hours * 3600;
    getLeaderBoardData();
    updateLeaderBoard(totalTimeTakenInSeconds);
  };

  useEffect(() => {
    const numberOfUnmatchedCards = cardData.filter(
      (cardItem) => !cardItem.isMatched
    ).length;
    if (numberOfUnmatchedCards === 0) {
      setGameCompleted(true);
      setGameStarted(false);
      prepareGameCompletionData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardData]);

  useEffect(() => {
    if (!fourLeaderBoard || !sixLeaderBoard || !eightLeaderBoard) {
      getLeaderBoardData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStartGame = () => {
    playBackgroundMusic();
    setStartedTimeStamp(new Date());
    setGameStarted(true);
    setGameCompleted(false);
    const newCardData = generateCardData(level.numberOfCards);
    setCardData(newCardData);
    setFlippedCard(null);
    setDiffSeconds(0);
    setDiffMinutes(0);
    setDiffHours(0);
    setCounter({
      steps: 0,
      moves: 0,
    });
    setPenaltyTime(0);
  };

  const handleNewGame = () => {
    setGameStarted(false);
    setGameCompleted(false);
    const newCardData = generateCardData(level.numberOfCards);
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

    // start processing the flipped cards
    setCardDataUpdating(true);

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
        playSuccessSound();
        setCardData(updatedCardData);
        setCardDataUpdating(false);
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
        playFailedSound();
        setCardData(updatedCardData);
        setCardDataUpdating(false);
      }, speed);
    }
    // rest
    setFlippedCard(null);
  };

  const handleLevelChange = (newLevel) => {
    setLevel(newLevel);
    const newCardData = generateCardData(newLevel.numberOfCards);
    setCardData(newCardData);
  };

  const handleHintClick = () => {
    setPenaltyTime((prev) => prev + 3);

    const hintableCards = cardData.filter((cardItem) => !cardItem.isMatched);
    const randomIndex = generateRandomNumber(hintableCards.length) - 1;
    const targetCard = hintableCards[randomIndex];

    const updatedCardData = cardData.map((cardItem) => {
      if (cardItem.imageUrl === targetCard.imageUrl) {
        return {
          ...cardItem,
          hint: true,
        };
      }
      return cardItem;
    });
    setCardData(updatedCardData);
    setTimeout(() => {
      setCardData(cardData);
    }, 300);
  };

  return (
    <CardDataContext.Provider
      value={{
        gameStarted,
        gameCompleted,
        numberOfCards: level.numberOfCards,
        cardData,
        cardDataUpdating,
        level,
        speed,
        moves: counter.moves,
        maxNumberOfHints: level.hints,
        userName,
        fourLeaderBoard,
        sixLeaderBoard,
        eightLeaderBoard,

        startedTimeStamp,
        diffSeconds,
        setDiffSeconds,
        diffMinutes,
        setDiffMinutes,
        diffHours,
        setDiffHours,
        penaltyTime,
        timeTakenDisplayValue,

        updateUserName: setUserName,
        handleHintClick,
        handleLevelChange,
        setSpeed,
        handleStartGame,
        handleNewGame,
        handleCardClick,
        updateLeaderBoard,
        getLeaderBoardData,
      }}
    >
      {children}
    </CardDataContext.Provider>
  );
};

export { CardDataContextProvider, CardDataContext };
