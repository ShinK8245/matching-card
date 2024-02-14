const generateCardData = (numberOfCards) => {
  const numberOfImages = numberOfCards / 2;

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 50 + 1);
  };

  let imageIds = [];

  //while we don't have enough random image Ids, keep generating
  while (imageIds.length < numberOfImages) {
    const randomNumber = generateRandomNumber();

    if (!imageIds.includes(randomNumber)) {
      imageIds.push(randomNumber);
    }
  }

  imageIds = [...imageIds, ...imageIds];
  //   imageIds = imageIds.concat(imageIds);
  imageIds.sort(() => Math.random() - 0.5);

  const cardData = imageIds.map((imageId, index) => {
    return {
      id: index + 1,
      imageUrl: `/assets/${imageId}.png`,
      isFlipped: false,
      isMatched: false,
    };
  });

  return cardData;
};

export { generateCardData };
