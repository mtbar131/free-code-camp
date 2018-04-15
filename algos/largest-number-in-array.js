function largestOfFour(arr) {
 
 var largestArr = [0, 0, 0, 0];
  
 for (var i = 0; i < arr.length; i++) {
   for (var l = 0; l < 4; l++) {
     
     if (arr[i][l] > largestArr[i]) {
       largestArr[i] = arr[i][l];
     }
     
   }
 }
  
  return largestArr;
}
