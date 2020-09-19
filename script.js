
var savedLocations = [];
var city;
var storedCities = JSON.parse(window.localStorage.getItem("storedCities")) || [];
// Buttons for previously searched cities. Once search button clicked your search will be displayed underneath the search bar and become a button that can be clicked to show weather
function CityHistoryBtn() {
    $("#searchResults").empty();

    if (savedLocations) {
        $("#prevSearchBtns").empty();
        var btns = $("<div>").attr("class", "list-group");
        for (var i = 0; storedCities.length > i; i++) {
            var cityBtn = $("<button>").attr("href", "#").attr("id", "city-btn").text(storedCities[i]);
            cityBtn.attr("class", "list-group-item list-group-item-action");
            btns.prepend(cityBtn);
            $("#prevSearchBtns").append(btns);
        }
    }
};
function searchForecasts(city) {
    CityHistoryBtn();
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",au&units=metric&appid=c7e4c50860cb5944f39ede1282e773c4",
        method: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data);
        }

    }).then(function (forecastData) {

        console.log(forecastData);
        var lon = forecastData.coord.lon;
        var lat = forecastData.coord.lat;


        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely&units=metric&appid=c7e4c50860cb5944f39ede1282e773c4",
            method: "GET",
            dataType: "json",
            success: function (data) {
                console.log(data);
            },

        }).then(function (allData) {
            console.log(allData)

            // Current Forecast
            var cityName = $("<h2>").text(city);
            var nowMoment = moment();
            var displayMoment = $("<h3>").text(nowMoment.format("MMM/D/YYYY"))
            var weatherIcon = $("<img>");
            weatherIcon.attr(
                "src",
                "https://openweathermap.org/img/w/" + forecastData.weather[0].icon + ".png"
            );
            var todayTemp = $("<div>").text("Temperature: " + forecastData.main.temp + "°C");
            var feelsLike = $("<div>").text("Feels Like: " + forecastData.main.feels_like + " °C");
            var humidity = $("<div>").text("Humidity: " + forecastData.main.humidity + "%");
            var windSpeed = $("<div>").text("Wind Speed: " + forecastData.wind.speed + " MPH");
            var UvIndex = $("<div>").addClass("btn btn-danger").text("UV Index: " + allData.current.uvi);

            $("#searchResults").empty();
            $("#searchResults").append(cityName, displayMoment, weatherIcon, todayTemp, feelsLike, humidity, windSpeed, UvIndex);

            // 5 Day Forecasts

        });
    });
};

// Event handler for user clicking the search forecast button
$("#searchBtn").on("click", function (event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    city = $("#searchArea").val().trim();
    console.log("You searched for " + city)
    if (city != "") {
        storedCities.push(city);
        localStorage.setItem("storedCities", JSON.stringify(storedCities));

        CityHistoryBtn();
        searchForecasts(city);

    }
});

// Event Handler for previously searched buttons so when clicked they will show weather of that city
$("#prevSearchBtns").on("click", "button", function (event) {
    event.preventDefault();
    var prevcity = $(this).text();

    searchForecasts(prevcity, city);
});