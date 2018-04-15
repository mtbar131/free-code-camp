function palindrome(str) {
  
    var t = 1;
    var myArr = [];
  
    // Remove non-alpha-numerics
    str = str.replace(/[^A-Za-z0-9]/g, '');
  
    str = str.toLowerCase();
  
    for (var i = 0; i < str.length; i++) {
      if (str.charAt(i) == str.charAt(str.length - t)) {
        myArr.push(str.charAt(i));
      }
  
      t++;
    }
    
    myArr = myArr.join('');
    
    if (myArr == str) {
      return true;
    }
    else {
      return false;
    }
  
  }