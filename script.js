var searchHistory = JSON.parse(localStorage.getItem("searchArea")) || [];


var city;
console.log(city);
function searchForecasts() {

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",au&appid=c7e4c50860cb5944f39ede1282e773c4",
        method: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data);
        }

    }).then(function (forecastData) {

        console.log(forecastData);
        var lon = forecastData.coord.lon;
        var lat = forecastData.coord.lat;
        // function searchWeather(city) {
        //     $.fetch({
        //         url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + ",au&appid=c7e4c50860cb5944f39ede1282e773c4"
        //     }).then(function (fetchData) {
        //         console.log(fetchData)
        //     });
        // };

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely&units=metric&appid=c7e4c50860cb5944f39ede1282e773c4",
            method: "GET",
            dataType: "json",
            success: function (data) {
                console.log(data);
            }
        }).then(function (allData) {
            console.log(allData)
            var nowMoment = moment();
            var displayMoment = $("<h3>").text(nowMoment.format("MMM/D/YYYY"))

            var cityName = $("<h2>").text(city.name);
            var todayTemp = $("<div>").text(main.temp);
            var feelsLike = $("<div>").text(main.feels_like);
            var humidity = $("<div>").text(main.humidity);
            var windSpeed = $("<div>").text(wind.speed);
            var UvIndex = $("<div>").text(value);


            $("#searchResults").append(displayMoment, cityName, todayTemp, feelsLike, humidity, windSpeed, UvIndex);
        });
        // searchWeather(city);
    });
};

// Event handler for user clicking the search forecast button
$("#searchBtn").on("click", function (event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    city = $("#searchArea").val().trim();
    console.log("You searched for" + city)
    searchForecasts();
});


