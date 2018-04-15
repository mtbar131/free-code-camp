function confirmEnding(str, target) {
  var targetLength = target.length;
  
  if (str.substring(str.length - targetLength, str.length) == target) {
    return true;
  }
  else {
    return false;
  }
}
