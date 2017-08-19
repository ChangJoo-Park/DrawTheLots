var observableModule = require("data/observable");

function HomeViewModel() {
    const viewModel = observableModule.fromObject({
        participant: '100',
        winner: '10'
    })
    return viewModel;
}

module.exports = HomeViewModel;