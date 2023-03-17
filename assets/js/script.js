$(document).ready(function () {

    const $searchBtn = $('#search-button');
    const $weatherTemp = $('.weatherTemp');
    const $weatherCity = $('.location');
    const $feelsLike = $('.feelsLike');
    const $weatherForecast = $('.weatherForecast');
    const $date = $('.date');

    //set todays date on the element with class date using dayjs

    $date.html(dayjs().format('dddd, MMMM D, YYYY'));


    

    $searchBtn.on('click', function (event) {
        let $city = $('#city').val();
        event.preventDefault();
        if ($city != '') {

            $.ajax({

                url: `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent($city)}&units=imperial&appid=25d33f8c57018604cd95eaaaa98fb241`,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    //save data to local storage
                    localStorage.setItem('weatherData', JSON.stringify(data.city.name));
                    console.log(data);
                    //display data
                    $weatherCity.html(data.city.name + ', ' + data.city.country);
                    $weatherTemp.html(data.list[0].main.temp + ' &deg;F');
                    $feelsLike.html(data.list[0].main.feels_like + ' &deg;F');
                },
                error: function () {
                    console.log('Error');
                }

            });
        }
    });
});