var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;

function ResultViewModel(result) {
  const viewModel = observableModule.fromObject({
    selected: '0',
    totalWinner: result.winner,
    winners: new ObservableArray(result.winners),
    offset: 5,
    index: 0,
    done: false,
    loadedWinners: new ObservableArray(),
    loadMoreWinners: function() {
      var lastIndex = this.index + this.offset;

      if (lastIndex > result.participant) {
        lastIndex = result.participant;
      }
      console.log("CURRENT INDEX : ", this.index);
      console.log("LAST INDEX : ", lastIndex);
      for (var i = this.index; i < lastIndex; i++) {
        this.loadedWinners.push(this.get("winners").getItem(i));
      }
      this.set("index", this.loadedWinners.length);
      return new Promise(
        function(resolve, reject) {
          resolve({
            hasMore: this.loadedWinners.length < result.participant,
            totalItem: this.winners.length
          });
        }.bind(this)
      );
    },
    toggleWinner: function(targetIndex) {
      // FIXME: Ripple Tap 이벤트에서 $index를 찾을 수 있으면 객체에 index 제거
      let item = this.get("loadedWinners").getItem(targetIndex);

      if (parseInt(this.selected, 10) === this.totalWinner && item.isGet === false) {
        return
      }
      this.get("loadedWinners").setItem(targetIndex, {
        index: item.index,
        number: item.number,
        isGet: !item.isGet
      });

      if (item.isGet) {
        this.set('selected', (parseInt(this.selected, 10) - 1).toString())
      } else {
        this.set('selected', (parseInt(this.selected, 10) + 1).toString())
      }

      this.set('done', parseInt(this.selected, 10) === this.totalWinner)
    }
  });
  return viewModel;
}

module.exports = ResultViewModel;
