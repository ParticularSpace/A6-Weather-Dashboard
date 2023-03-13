$searchBtn = $('.search-btn');
$weatherTemp = $('.weather-temp');

$searchBtn.on('click', function() {
    // Pull data from weather api and display it
    $.ajax({

        url: 'http://api.openweathermap.org/data/2.5/weather?q=Washington,usa&APPID=25d33f8c57018604cd95eaaaa98fb241',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log(data);
            $weatherTemp.html(data.main.temp);
        },
        error: function() {
            console.log('Error');
        }
    });

});