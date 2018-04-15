function repeatStringNumTimes(str, num) {
  
  if (num <= 0) {
    return '';
  }
  else {
    
    var originalStr = str;
    
    for (var i = 0; i < num - 1; i++) {
      str = str + originalStr;
    }
    
    return str;
  }
 
}