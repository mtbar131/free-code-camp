function findLongestWord(str) {
  
  var myArr = str.split(' ');
  var largest = '';

  for (var i = 0; i < myArr.length; i++) {
    if (myArr[i].length > largest.length) {
      largest = myArr[i];
    }  
  }

  return largest.length; 

}