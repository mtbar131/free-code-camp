function pairElement(str) {
  var pairs = { "A": "T", "T": "A", "C": "G", "G": "C" };
  var pArr = [];
  for(var i of str) {
    pArr.push([i, pairs[i]]);
  }
  str = pArr;
  return str;
}
