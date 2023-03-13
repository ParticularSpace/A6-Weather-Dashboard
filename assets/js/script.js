$searchBtn = $('.search-btn');
$weatherTempBellingham = $('.weatherTempBellingham');
$weatherCityBellingham = $('.weatherCityBellingham');
$weatherIconBellingham = $('.weatherIconBellingham');
// $searchBtn.on('click', function() {
    // Pull data from weather api and display it
    $.ajax({

        url: 'http://api.openweathermap.org/data/2.5/weather?q=bellingham,Washington,usa&APPID=25d33f8c57018604cd95eaaaa98fb241',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log(data);
            $weatherCityBellingham.html(data.name);
            $weatherTempBellingham.html(data.main.temp);

        },
        error: function() {
            console.log('Error');
        }
    });
// });