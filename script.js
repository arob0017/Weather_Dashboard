var searchHistory = JSON.parse(localStorage.getItem("searchArea")) || [];

function searchForecasts() {


    $.ajax({ url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",au&appid=c7e4c50860cb5944f39ede1282e773c4" }).then(function (forecastData) {

        console.log(forecastData);
        var lon = forecastData.coord.lon;
        var lat = forecastData.coord.lat;
        function searchWeather(_city_) {
            $.fetch({ url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + ",au&appid=c7e4c50860cb5944f39ede1282e773c4" }).then(function (fetchData) {
                console.log("______")
            });
        };

        $.ajax({ url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely&units=metric&appid=c7e4c50860cb5944f39ede1282e773c4" }).then(function (allData) {
            console.log(allData)

        });
        searchWeather(_city_);
    });

    var cityName = $("<h2>").text(city.name);
    var todayTemp = $("<div>").text(main.temp);
    var feelsLike = $("<div>").text(main.feels_like);
    var humidity = $("<div>").text(main.humidity);
    var windSpeed = $("<div>").text(wind.speed);
    var UvIndex = $("<div>").text(value);


    $("#searchResults").append(cityName, todayTemp, feelsLike, humidity, windSpeed, UvIndex);
};

// Event handler for user clicking the search forecast button
$("#searchBtn").on("click", function (event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the city name
    function getSearchVal() {
        var city = document.querySelector("#search-value").val().trim();
        //the variable is passed into this function and it will have to then be used in this function
        searchForecasts(city);
    }
    getSearchVal();
});
