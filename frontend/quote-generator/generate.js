const colors = [
  "tomato",
  "black",
  "blueviolet",
  "darkblue",
  "darkgreen",
  "darkmagenta",
  "darkred",
  "deeppink",
  "dimgrey",
  "forestgreen",
  "indigo",
  "fuchsia",
  "orangered"
];
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const newBtn = document.getElementById("newBtn");
const newLink = document.getElementById("newLink");
const tweetBtn = document.getElementById("tweetBtn");
const tweetLink = document.getElementById("tweetLink");

// Set styles on page load
document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
newBtn.style.backgroundColor = document.body.style.backgroundColor;
tweetBtn.style.backgroundColor = document.body.style.backgroundColor;

// Match button hover color to background
newBtn.addEventListener("mouseover", () => {
  newBtn.style.backgroundColor = "white";
  newLink.style.color = document.body.style.backgroundColor;
});
newBtn.addEventListener("mouseout", () => {
  newBtn.style.backgroundColor = document.body.style.backgroundColor;
  newLink.style.color = "white";
});
tweetBtn.addEventListener("mouseover", () => {
  tweetBtn.style.backgroundColor = "white";
  tweetLink.style.color = document.body.style.backgroundColor;
});
tweetBtn.addEventListener("mouseout", () => {
  tweetBtn.style.backgroundColor = document.body.style.backgroundColor;
  tweetLink.style.color = "white";
});

// Get Quote
var request = new XMLHttpRequest();
request.open("GET", "https://talaikis.com/api/quotes/random/", true);
request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    var data = JSON.parse(request.responseText);
    quote.innerHTML = data.quote;
    author.innerHTML = "- " + data.author;
    tweetLink.setAttribute(
      "href",
      `https://twitter.com/intent/tweet?text="${data.quote}" -${data.author}`
    );
  }
};
request.send();

// New quote
newBtn.addEventListener('click', () => {
  
  // Get new content
  var request = new XMLHttpRequest();
  request.open("GET", "https://talaikis.com/api/quotes/random/", true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      quote.innerHTML = data.quote;
      author.innerHTML = "- " + data.author;
      tweetLink.setAttribute(
        "href",
        `https://twitter.com/intent/tweet?text="${data.quote}" -${data.author}`
      );
    }
  };
  request.send();
  
  // Update background and ensure not same twice in a row
  var currentColor = document.body.style.backgroundColor;
  while(document.body.style.backgroundColor == currentColor) {
    document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  }
  
  // Reset button styles to avoid quirks
  newBtn.style.backgroundColor = document.body.style.backgroundColor;
  newLink.style.color = 'white';
  tweetBtn.style.backgroundColor = document.body.style.backgroundColor;
  tweetLink.style.color = 'white';
});

// Check if tweet is too long
tweetBtn.addEventListener('click', (e) => {
  if (quote.innerHTML.length > 280) { 
     alert('That quote is too long to tweet');
     e.preventDefault();
  }
})
