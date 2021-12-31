//var APIkey = "375199121bf30635560db142814fd5ce";


$(document).ready(function(){

    var cities = [];

    $("#searchedCity").hide();
    $("#future5").hide();

    
    function displayCityForecast(city){
        var apiKey = "375199121bf30635560db142814fd5ce";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            var weatherIcon = response.weather[0].icon;
            var date = $("<h2>").text(moment().format('l'));
            var icon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"); 
            var tempFar = (response.main.temp - 273.15) * 1.80 + 32;

            $("#cityName").text(response.name);
            $("#cityName").append(date);
            $("#cityName").append(icon);
            $("#cityTemp").text(tempFar.toFixed(2) + " \u00B0F");
            $("#cityHumidity").text(response.main.humidity + "%");
            $("#cityWind").text(response.wind.speed + "MPH");

            var lat = response.coord.lat
            var lon = response.coord.lon
            queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon; 
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response){


                var uvIndex = response.value;
            $("#cityUVindex").removeClass("fair");
            $("#cityUVindex").removeClass("moderate");
            $("#cityUVindex").removeClass("severe");
                if (uvIndex <= 2.9){
                    $("#cityUVindex").addClass("fair");
                } else if (uvIndex >= 3 && uvIndex <= 7.9){
                    $("#cityUVindex").addClass("moderate");
                } else {
                    $("#cityUVindex").addClass("severe");};
                    $("#cityUVindex").text(response.value);});   
                    $("#city").show();}); 
};