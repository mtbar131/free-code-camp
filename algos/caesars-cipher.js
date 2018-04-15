// Warning! Extreme lazy ahead

function rot13(str) {
 
  str = str.split("");
 
  for (var i = 0; i < str.length; i++) {
    console.log('loop number: ' + i);
    
      if (str[i] == 'A') {
        str[i] = 'N';
      }
      else if (str[i] == 'B') {
        str[i] = 'O';
      }
      else if (str[i] == 'C') {
        str[i] = 'P';
      }
      else if (str[i] == 'D') {
        str[i] = 'Q';
      }
      else if (str[i] == 'E') {
        str[i] = 'R';
      }
      else if (str[i] == 'F') {
        str[i] = 'S';
      }
      else if (str[i] == 'G') {
        str[i] = 'T';
      }
      else if (str[i] == 'H') {
        str[i] = 'U';
      }
      else if (str[i] == 'I') {
        str[i] = 'V';
      }
      else if (str[i] == 'J') {
        str[i] = 'W';
      }
      else if (str[i] == 'K') {
        str[i] = 'X';
      }
      else if (str[i] == 'L') {
        str[i] = 'Y';
      }
      else if (str[i] == 'M') {
        str[i] = 'Z';
      }
      else if (str[i] == 'N') {
        str[i] = 'A';
      }
      else if (str[i] == 'O') {
        str[i] = 'B';
      }
      else if (str[i] == 'P') {
        str[i] = 'C';
      }
      else if (str[i] == 'Q') {
        str[i] = 'D';
      }
      else if (str[i] == 'R') {
        str[i] = 'E';
      }
      else if (str[i] == 'S') {
        str[i] = 'F';
      }
      else if (str[i] == 'T') {
        str[i] = 'G';
      }
      else if (str[i] == 'U') {
        str[i] = 'H';
      }
      else if (str[i] == 'V') {
        str[i] = 'I';
      }
      else if (str[i] == 'W') {
        str[i] = 'J';
      }
      else if (str[i] == 'X') {
        str[i] = 'K';
      }
      else if (str[i] == 'Y') {
        str[i] = 'L';
      }
      else if (str[i] == 'Z') {
        str[i] = 'M';
      }
      else {
        console.log('twas a space');
      }
  }
  
  str = str.join("");
  return str;
  
}
