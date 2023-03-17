$(document).ready(function () {

    const $searchBtn = $('#search-button');
    const $weatherTemp = $('.weatherTemp');
    const $weatherCity = $('.weatherCity');
    const $feelsLike = $('.feelsLike');
    const $weatherForecast = $('.weatherForecast');
    

    $searchBtn.on('click', function (event) {
        let $city = $('#city').val();
        event.preventDefault();

        if ($city.length == 'city') {
            //empty input field
            $("#search-input").val('');
            window.alert("Please enter a valid zip code");
            
        } else {

            $.ajax({

                url: `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent($city)}&units=imperial&appid=25d33f8c57018604cd95eaaaa98fb241`,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    //save data to local storage
                    localStorage.setItem('weatherData', JSON.stringify(data.city.name));
                    console.log(data);
                    //display data
                    $weatherCity.html(data.name + ', ' + data.city.country);
                    $weatherTemp.html(data.main.temp + ' &deg;F');
                    $feelsLike.html(data.main.feels_like + ' &deg;F');
                },
                error: function () {
                    console.log('Error');
                }

            

            });
        }
    });
});