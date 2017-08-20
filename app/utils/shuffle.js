function shuffle(targetArray) {
  var toSwap = null;
  var tempNumber = null;
  for (var i = targetArray.length - 1; i >= 0; i--) {
    toSwap = Math.floor(Math.random() * (i + 1));
    tempNumber = targetArray[i];
    targetArray[i] = targetArray[toSwap];
    targetArray[i].index = i; // FIXME: Ripple에서 인덱스를 알 수 있으면 제거해야함
    targetArray[toSwap] = tempNumber;
  }

  return targetArray;
}
exports.shuffle = shuffle;
