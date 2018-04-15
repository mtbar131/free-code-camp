$(document).ready(function() {
    // Get visitor coordinates
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var endpoint =
                "https://api.wunderground.com/api/3ca20cd1a33c42b3/conditions/q/" +
                latitude +
                "," +
                longitude +
                ".json";

            // Get weather data
            $.getJSON(endpoint, function(json) {
                // Update UI text
                $("#location").html(json.current_observation.display_location.full);
                $("#temp").html("Temperature: " + json.current_observation.temp_f + " °F");
                $("#description").html("Description: " + json.current_observation.weather);
                $("#updated").html(json.current_observation.observation_time);

                // Snow Icon
                if (json.current_observation.weather.includes('Snow') || json.current_observation.weather.includes('Ice') || json.current_observation.weather.includes('Hail') || json.current_observation.weather.includes('Freezing')) {
                    $('#icon').addClass('icon flurries');
                    $('<div class="cloud"></div><div class="snow"><div class="flake"></div><div    class="flake"></div></div>').appendTo('#icon');
                }
                // Shower icon
                else if (json.current_observation.weather.includes('Drizzle') || json.current_observation.weather.includes('Spray') || json.current_observation.weather.includes('Mist')) {
                    $('#icon').addClass('icon sun-shower');
                    $('<div class="cloud"></div><div class="sun"><div class="rays"></div></div><div> class="rain"></div>').appendTo('#icon');
                }
                // Thunderstorm icon
                else if (json.current_observation.weather.includes('Thunder')) {
                    $('#icon').addClass('icon thunder-storm');
                    $('<div class="cloud"></div><div class="lightning"><div class="bolt"></div><div class="bolt"></div></div>').appendTo('#icon');
                }
                // Sunny icon
                else if (json.current_observation.weather.includes('Clear')) {
                    $('#icon').addClass('icon sunny');
                    $('<div class="sun"><div class="rays"></div></div>').appendTo('#icon');
                }
                // Rainy icon
                else if (json.current_observation.weather.includes('Rain') || json.current_observation.weather.includes('Shower')) {
                    $('#icon').addClass('icon rainy');
                    $('<div class="cloud"></div><div class="rain"></div>').appendTo('#icon');
                }
                // Default Cloudy
                else {
                    $('#icon').addClass('icon cloudy');
                    $('<div class="cloud"></div><div class="cloud"></div>').appendTo('#icon');
                }

            });
        });
    }
    else {
        console.log("Browser doesn't support geolocation");
    }
});
