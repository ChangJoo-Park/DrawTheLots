var observableModule = require("data/observable");
var ObservableArray =  require('data/observable-array').ObservableArray

function ResultViewModel(result) {
    const viewModel = observableModule.fromObject({
    	winners: new ObservableArray(result.winners),
    	offset: 5,
    	index: 0,
    	loadedWinners: new ObservableArray(),
    	loadMoreWinners: function () {
    		var lastIndex = this.index + this.offset

    		if (lastIndex > result.participant) {
    			lastIndex = result.participant
    		}
    		console.log('CURRENT INDEX : ', this.index)
    		console.log('LAST INDEX : ', lastIndex)
    		for (var i = this.index; i < lastIndex; i++) {
	    		this.loadedWinners.push(this.get('winners').getItem(i))
    		}
    		this.set('index', this.loadedWinners.length)
    		return new Promise(function (resolve, reject) {
    			resolve({
    				hasMore: this.loadedWinners.length < result.participant,
    				totalItem: this.winners.length
    			})
    		}.bind(this))
    	},
      toggleWinner: function (targetIndex) {
      	let item = this.get('loadedWinners').getItem(targetIndex)
      	item.isGet = !item.isGet
      	this.get('loadedWinners').setItem(targetIndex, {
      		number: item.number,
      		isGet: item.isGet
      	})
      }
    })
    return viewModel;
}

module.exports = ResultViewModel;