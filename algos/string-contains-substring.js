function mutation(arr) {
  for(var i = 0; i <= arr[1].length -1; i++){
    if (arr[0].toLowerCase().indexOf(arr[1][i].toLowerCase()) == -1) {
      return false;
    }
  }
  
  return true;
}