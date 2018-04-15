function sumAll(arr) {
  
  var largest = Math.max.apply(null, arr);
  var smallest = Math.min.apply(null, arr);
  
  var iterator = largest - smallest + 1;
  var trailingValue = 0;
  
  for(var i = 0; i < iterator; i++) {
    trailingValue += smallest;
    smallest++;
  }
  
  return trailingValue;
}