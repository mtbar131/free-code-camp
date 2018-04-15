function truncateString(str, num) {
  
  if (num <= 3) {
    return str.slice(0, num) + '...';
  }
  else if (num >= str.length) {
    return str;
  }
  else {
    return str.slice(0, num - 3) + '...';
  }
  
}