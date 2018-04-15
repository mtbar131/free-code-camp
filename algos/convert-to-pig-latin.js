function translatePigLatin(str) {

  var first = str[0];
  var second = str[1];
  
  if (first == 'a' || first == 'e' || first == 'i' || first == 'o' || first == 'u') {
    str = str + 'way';
    return str;
  }
  else if (second == 'a' || second == 'e' || second == 'i' || second == 'o' || second == 'u') {
    str = str.substr(1);
    str = str + first + 'ay';
    return str;
  }
  else {
    str = str.substr(2);
    str = str + first + second + 'ay';
    return str;
  }
}