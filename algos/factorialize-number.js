function factorialize(input) {
  for (var t = 1; input >= 1; input--) {
    t = input * t;
  }
  return t;
  
}