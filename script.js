//var APIkey = "375199121bf30635560db142814fd5ce";


$(document).ready(function(){

    var cities = [];

    $("#cityDisplay").hide();
    $("#future5").hide();

    
    function cityForecast(city){
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
                    $("#cityDisplay").show();});
                };


    function fiveDay(city){
        var apiKey = "d6563c1f7289474849eef3ceaf635e1d"
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
                
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            var counter = 1
            for(var i=0; i < response.list.length; i += 8){
                var date = moment(response.list[i].dt_txt).format("l");
                var weatherIcon = response.list[i].weather[0].icon;
                var temperatureF = (response.list[i].main.temp - 273.15) * 1.80 + 32;
                                
                $("#day-" + counter).text(date);
                $("#pic" + counter).attr("src", "https://openweathermap.org/img/wn/" + weatherIcon + ".png");
                $("#temp-" + counter).text(temperatureF.toFixed(2) + " \u00B0F");
                $("#humid-" + counter).text(response.list[i].main.humidity + "%"); counter++;};
                $("#future5").show();   
                });
                };
                
    function searchedCities(city){
        var cityList = $("<li>").text(city)
        cityList.addClass("searchedCity");
        $("#searchedCity").append(cityList);};
                
                
    function getCities(){
        $("#searchedCity").empty();
        for (var i = 0; i < cities.length; i++) { 
            searchedCities(cities[i]);
        };};
                
    function weather(city){
        cityForecast(city);
        fiveDay(city);};
    function init() {
                
    var storedCities = JSON.parse(localStorage.getItem("searches"));
        if (storedCities) {
            cities = storedCities;
            getCities();
            weather(cities[cities.length -1]);
        };};
    init();


$("#searchBtn").click(function(){
    var cityInputs = $(this).siblings("#cityInput").val().trim();
    $("#cityInput").val("");
    if (cityInputs !== ""){
        if (cities.indexOf(cityInputs)== -1){
            cities.push(cityInputs);
            localStorage.setItem("searches",JSON.stringify(cities));
            searchedCities(cityInputs);
        };
        weather(cityInputs);};
});
$("#searchedCity").on("click", ".searchedCity", function(){
    var cityButton = $(this).text();
    weather(cityButton);
});
});