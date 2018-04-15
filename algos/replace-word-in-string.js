function myReplace(str, before, after) {
  if (str.charCodeAt(str.indexOf(before)) >= 65 && str.charCodeAt(str.indexOf(before)) <= 90) {
     return str.replace(before, after.charAt(0).toUpperCase() + after.slice(1));
  }
  return str.replace(before, after);
}

myReplace("His name is Tom", "Tom", "john");