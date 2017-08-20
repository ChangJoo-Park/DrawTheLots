var observableModule = require("data/observable");

function HomeViewModel() {
  const participantCount = getRandomInt(10, 200) || 100;
  const winnerCount = getRandomInt(1, participantCount * 0.1) || 10;

  const viewModel = observableModule.fromObject({
    participant: participantCount.toString(),
    winner: winnerCount.toString()
  });
  return viewModel;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = HomeViewModel;
