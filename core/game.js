// const codePegs = ['RED', 'BLACK', 'WHITE', 'YELLOW', 'GREEN', 'BLUE'];

const getRandomElementOfArray = (array) => array[Math.floor(Math.random() * array.length)];

const createPattern = (codePegs) => {
  const pattern = new Array(4).fill(null);
  return pattern.map(() => getRandomElementOfArray(codePegs));
};

const getFeedback = (guess, pattern) => {
  const shuffle = (array) => array.sort(() => Math.random() - 0.5);

  const feedback = Array(4).fill('EMPTY');

  guess.forEach((element, index) => {
    if (element === pattern[index]) {
      feedback.splice(index, 1, 'BLACK');
      pattern.splice(index, 1, null);
    }
  });

  guess.forEach((element, index) => {
    if (pattern.includes(element)) {
      feedback.splice(index, 1, 'WHITE');
      pattern.splice(pattern.indexOf(element), 1, null);
    }
  });

  return shuffle(feedback);
};

// TODO: use redux ?

module.exports = { getRandomElementOfArray, createPattern, getFeedback };
