var observableModule = require("data/observable");
var shuffleUtil = require('../utils/shuffle')

function ResultViewModel(result) {
    const viewModel = observableModule.fromObject({
      result: result,
      winners: result.winners,
      toggleWinner: function (targetIndex) {
        this.winners[targetIndex].isGet = !this.winners[targetIndex].isGet
      }
    })
    return viewModel;
}

module.exports = ResultViewModel;