var shuffleUtil = require("./shuffle.js");

onmessage = function(msg) {
  var numberOfParticipant = msg.data.numberOfParticipant;
  var participantArray = [];
  for (var i = 0; i < numberOfParticipant; i++) {
    participantArray.push({
      number: i + 1,
      isGet: false
    });
  }

  var shuffled = shuffleUtil.shuffle(participantArray);
  postMessage({ res: "success", shuffledWinners: shuffled });
};

onerror = function(e) {
  // console.log("An error occurred in worker. Main will handle this. Err: " + e);
  // return true to not propagate to main
};
