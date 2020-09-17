
var savedLocations = [];
var city;
var storedCities = JSON.parse(localStorage.getItem("cityBtn")) || [];

function CityHistoryBtn(cityList) {
    $("#searchResults").empty();

    var keys = Object.keys(cityList);
    for (var i = 0; i < keys.length; i++) {
        var cityBtn = $("<button>");
        cityBtn.addClass("list-group-item list-group-item-action");

        var splitStr = keys[i].toLowerCase().split(" ");
        for (var j = 0; j < splitStr.length; j++) {
            splitStr[j] =
                splitStr[j].charAt(0).toUpperCase() + splitStr[j].substring(1);
        }

        cityBtn.text(splitStr.join(" "));

        $("#searchResults").append(cityBtn);
    }
}


function searchForecasts() {
    // CityHistoryBtn(cityList);
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
            error: function () {
                savedLocations.splice(savedLocations.indexOf(city), 1);
                localStorage.setItem("searchArea", JSON.stringify(savedLocations));
                PreviousSearch();
            }
        }).then(function (allData) {
            console.log(allData)


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

            // for (var i = 1; i < allData.daily.length; i++) {
            //     // var dayDate = $("<h4>").text(moment(format("MMM/D/YYYY")));
            //     var dayTemp = $("<div>").text("Tempurature" + temp.day);
            //     var dayHumidity = $("<div>").text("Humidity" + humidity);
            //     $("#5DayForecast").append(dayDate, dayTemp, dayHumidity);
            // }

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
        localStorage.setItem("storedCities", JSON.stringify(storedCities));
        searchForecasts();
        CityHistoryBtn();
    }

});
