$searchBtn = $('.search-btn');
$weatherTempBellingham = $('.weatherTempBellingham');
$weatherCityBellingham = $('.weatherCityBellingham');
$weatherIconBellingham = $('.weatherIconBellingham');
$feelsLikeBellingham = $('.feelsLikeBellingham');
// $searchBtn.on('click', function() {
    // Pull data from weather api and display it
    $.ajax({

        url: 'http://api.openweathermap.org/data/2.5/weather?q=bellingham,Washington,usa&units=imperial&APPID=25d33f8c57018604cd95eaaaa98fb241',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log(data);
            $weatherCityBellingham.html(data.name + ', ' + data.sys.country);
            $weatherTempBellingham.html(data.main.temp + ' &deg;F');
            $feelsLikeBellingham.html(data.main.feels_like + ' &deg;F');
        },
        error: function() {
            console.log('Error');
        }
    });
// });