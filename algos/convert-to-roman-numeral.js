function convertToRoman(num) {
  if (num-1000>=0) return "M" + convertToRoman(num-1000);
  if (num-900>=0) return "CM" + convertToRoman(num-900);
  if (num-500>=0) return "D" + convertToRoman(num-500);
  if (num-400>=0) return "CD" + convertToRoman(num-400);
  if (num-100>=0) return "C" + convertToRoman(num-100);
  if (num-90>=0) return "XC" + convertToRoman(num-90);
  if (num-50>=0) return "L" +convertToRoman(num-50);
  if (num-40>=0) return "XL" +convertToRoman(num-40);
  if (num-10>=0) return "X" + convertToRoman(num-10);
  if (num-9>=0) return "IX" + convertToRoman(num-9);
  if (num-5>=0) return "V" + convertToRoman(num-5);
  if (num-4>=0) return "IV" + convertToRoman(num-4);
  if (num-1>=0) return "I" + convertToRoman(num-1);
return "";
}