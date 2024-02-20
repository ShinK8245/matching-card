import { createContext, useEffect, useState } from "react";

const SoundContext = createContext();

const SoundContextProvider = ({ children }) => {
  const [backgroundMusic] = useState(new Audio("/assets/sounds/bgm.mp3"));
  const [success] = useState(new Audio("/assets/sounds/success.mp3"));
  const [failed] = useState(new Audio("/assets/sounds/failed.mp3"));
  const [hint] = useState(new Audio("/assets/sounds/hint.mp3"));

  useEffect(() => {
    backgroundMusic.loop = true;
  }, [backgroundMusic]);

  const playBackgroundMusic = () => {
    backgroundMusic.play();
  };
  const playSuccessSound = () => {
    success.load();
    success.play();
  };
  const playFailedSound = () => {
    failed.load();
    failed.play();
  };
  const playHintSound = () => {
    hint.load();
    hint.play();
  };

  return (
    <SoundContext.Provider
      value={{
        playBackgroundMusic,
        playSuccessSound,
        playFailedSound,
        playHintSound,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export { SoundContextProvider, SoundContext };
