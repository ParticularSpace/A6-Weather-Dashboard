$(document).ready(function () {

    const $searchBtn = $('#search-button');
    const $weatherTempBellingham = $('.weatherTempBellingham');
    const $weatherCityBellingham = $('.weatherCityBellingham');
    const $feelsLikeBellingham = $('.feelsLikeBellingham');


    $searchBtn.on('click', function (event) {

        event.preventDefault();

        const cityZip = $("#search-input").val();


        $.ajax({

            url: `http://api.openweathermap.org/data/2.5/weather?zip=${cityZip}&units=imperial&APPID=25d33f8c57018604cd95eaaaa98fb241`,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                //save data to local storage
                localStorage.setItem('weatherData', JSON.stringify(data));
                console.log(data);
                //display data
                $weatherCityBellingham.html(data.name + ', ' + data.sys.country);
                $weatherTempBellingham.html(data.main.temp + ' &deg;F');
                $feelsLikeBellingham.html(data.main.feels_like + ' &deg;F');
            },
            error: function () {
                console.log('Error');
            }

        });

    });
});