$(document).ready(function () {

    const $searchBtn = $('#search-button');
    const $weatherTemp = $('.weatherTemp');
    const $weatherCity = $('.location');
    const $feelsLike = $('.feelsLike');
    const $dateOne = $('.locationDateOne');
    const $dateTwo = $('.locationDateTwo');
    const $dateThree = $('.locationDateThree');
    const $dateFour = $('.locationDateFour');
    const $dateFive = $('.locationDateFive');
    
    const $dateCard = $('.date');
    const $todayDate = dayjs();
    //set todays date on the element with class date using dayjs
    $dateCard.html(dayjs().format('dddd, MMMM D'));


    const tomorrow = $todayDate.add(1, 'day' ); // add one day to get tomorrow's date
    const dayThree = $todayDate.add(2, 'day');
    const dayFour = $todayDate.add(3, 'day');
    const dayFive = $todayDate.add(4, 'day');
    const daySix = $todayDate.add(5, 'day');


    // apply today, tomorrow, and the next 3 days to the forecast dates with class locationFore
    $dateOne.html(tomorrow, 'dddd');
    $dateTwo.html(dayThree, 'dddd');
    $dateThree.html(dayFour, 'dddd');
    $dateFour.html(dayFive, 'dddd');
    $dateFive.html(daySix, 'dddd');

    




    // loop through the next five days and display each date
    // for (let i = 0; i < 5; i++) {
    //     const date = tomorrow.add(i, 'day');
    //     console.log(date.format('YYYY-MM-DD'));
    //     $dateForecast.html(date);
    // }

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