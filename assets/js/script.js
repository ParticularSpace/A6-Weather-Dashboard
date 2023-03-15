$(document).ready(function () {

    const $searchBtn = $('#search-button');
    const $weatherTempBellingham = $('.weatherTempBellingham');
    const $weatherCityBellingham = $('.weatherCityBellingham');
    const $feelsLikeBellingham = $('.feelsLikeBellingham');
    const $weatherForecast = $('.weatherForecast');


    $searchBtn.on('click', function (event) {

        event.preventDefault();

        const cityZip = $("#search-input").val();

        if (cityZip.length !== 5) {
            //empty input field
            $("#search-input").val('');
            window.alert("Please enter a valid zip code");
            
        } else {

            $.ajax({

                url: `http://api.openweathermap.org/data/2.5/weather?zip=${cityZip}&units=imperial&APPID=25d33f8c57018604cd95eaaaa98fb241`,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    //save data to local storage
                    localStorage.setItem('weatherData', JSON.stringify(data.name));
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

            // $.ajax({

            //     url: `http://api.openweathermap.org/data/2.5/forcast/zip?zip=${cityZip}&appid=25d33f8c57018604cd95eaaaa98fb241`,
            //     type: 'GET',
            //     dataType: 'json',
            //     success: function (data) {
            //         console.log(data);
            //         //display weather forecast data
            //         $weatherForecast.html(data.list);
            //     },
            //     error: function () {
            //         console.log('Error');
            //     }

            // });
        }
    });
});