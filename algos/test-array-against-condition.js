// Returns new array that meets conditions of the second argument

function dropElements(arr, func) {

  var count = 0;
  while (!func(arr[count])) arr.shift();
  
  return arr;
}

dropElements([1, 2, 3, 4], function(n) {return n > 5;});