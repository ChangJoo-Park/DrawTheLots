function shuffle(targetArray) {
	var toSwap = null
	var tempNumber = null
  for(var i = targetArray.length - 1; i >= 0; i--) {
      toSwap = Math.floor(Math.random() * (i + 1));
      tempNumber = targetArray[i];
      targetArray[i] = targetArray[toSwap];
      targetArray[toSwap] = tempNumber;
  }

	return targetArray
}
exports.shuffle = shuffle;