var observableModule = require("data/observable");

function HomeViewModel() {
    const viewModel = observableModule.fromObject({
        participant: '100',
        winner: '10',
        setParticipant: function (pAmount) {
            this.set('participant', pAmount)
            if (pAmount < this.get('winner')) {
                this.set('winner', pAmount)
            }
        },
        setWinner: function (wAmount) {
            this.set('winner', wAmount)
            if (wAmount > this.get('participant')) {
                this.set('participant', wAmount)
            }
        }
    })
    return viewModel;
}

module.exports = HomeViewModel;