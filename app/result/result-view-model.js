var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
/**
 * Methods For View
 */
var loadMoreWinners = function() {
  const index = this.getIndex();

  for (var i = index.first; i < index.last; i++) {
    this.loadedWinners.push(this.get("winners").getItem(i));
  }

  this.set("index", this.loadedWinners.length);

  return new Promise(
    function(resolve, reject) {
      resolve({
        hasMore: this.loadedWinners.length < this.totalParticipant,
        totalItem: this.winners.length
      });
    }.bind(this)
  );
};

var toggleWinner = function(targetIndex) {
  // FIXME: Ripple Tap 이벤트에서 $index를 찾을 수 있으면 객체에 index 제거
  let item = this.get("loadedWinners").getItem(targetIndex);

  if (this.checkDone(this.selected, this.totalWinner, item.isGet)) {
    return;
  }

  this.get("loadedWinners").setItem(targetIndex, {
    index: item.index,
    number: item.number,
    isGet: !item.isGet
  });

  this.updateSelected(this.selected, item.isGet);
};

/**
 * Methods For ViewModel
 */
var getIndex = function() {
  let offset = this.offset;

  if (this.index === 0) {
    offset = this.totalWinner;
  }

  let lastIndex = this.index + offset;

  if (lastIndex > this.totalParticipant) {
    lastIndex = this.totalParticipant;
  }

  return {
    first: this.index,
    last: lastIndex
  };
};

var checkDone = function(selected, totalWinner, isGet) {
  const s = parseInt(selected, 10);
  const w = parseInt(totalWinner, 10);
  return s === w && !isGet;
};

var updateSelected = function(selected, isGet) {
  const offset = isGet ? -1 : 1;
  const s = parseInt(selected, 10) + offset;
  this.set("selected", s.toString());
};

var getWinners = function() {
  return this.loadedWinners.filter(winner => winner.isGet);
};

function ResultViewModel(result) {
  const viewModel = observableModule.fromObject({
    selected: "0",
    totalParticipant: result.participant,
    totalWinner: result.winner,
    winners: new ObservableArray(result.winners),
    loadedWinners: new ObservableArray(),
    offset: 5,
    index: 0,
    getIndex: getIndex,
    loadMoreWinners: loadMoreWinners,
    toggleWinner: toggleWinner,
    getWinners: getWinners,
    checkDone: checkDone,
    updateSelected: updateSelected
  });
  return viewModel;
}

module.exports = ResultViewModel;
