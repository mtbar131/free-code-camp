//Focus search input on page load
$(document).ready(function() {
    $('#userInput').focus();
});

//Random button handler
$('#randomButton').click(function() {
    $('.vertical-center').fadeOut(500, function() {
        $('body').append('<iframe width="100%" height="1000px" src="https://en.wikipedia.org/wiki/Special:Random" />')
})
});

//Search button handler
$('#searchButton').click(function() {
    var input = $('#userInput').val().replace(/ /g, "_");
    var wiki = "https://en.wikipedia.org/wiki/"
    
    $('.vertical-center').fadeOut(500, function() {
        $('body').append(`<iframe width="100%" height="1000px" src=${wiki + input} />`)
    })
});