$(document).ready(function () {
    const $searchBtn = $('#search-button');
    const $searchHistory = $('#search-history');
    const $weatherTemp = $('.weatherTemp');
    const $weatherCity = $('.location');
    const $feelsLike = $('.feelsLike');
    const $dateCard = $('.date');
    const $todayDate = dayjs();
    
    const $temperatureCards = [".temperature1", ".temperature2", ".temperature3", ".temperature4", ".temperature5"];
    const $descriptionCards = [".description:eq(0)", ".description:eq(1)", ".description:eq(2)", ".description:eq(3)", ".description:eq(4)"];

    const $dateOne = $('.locationDateOne');
    const $dateTwo = $('.locationDateTwo');
    const $dateThree = $('.locationDateThree');
    const $dateFour = $('.locationDateFour');
    const $dateFive = $('.locationDateFive');

    // Set today's date
    $dateCard.html(dayjs().format('dddd, MMMM D'));

    const tomorrow = $todayDate.add(1, 'day');
    const dayThree = $todayDate.add(2, 'day');
    const dayFour = $todayDate.add(3, 'day');
    const dayFive = $todayDate.add(4, 'day');
    const daySix = $todayDate.add(5, 'day');

    // Set the forecast dates
    $dateOne.html(tomorrow.format('dddd, MMMM D'));
    $dateTwo.html(dayThree.format('dddd, MMMM D'));
    $dateThree.html(dayFour.format('dddd, MMMM D'));
    $dateFour.html(dayFive.format('dddd, MMMM D'));
    $dateFive.html(daySix.format('dddd, MMMM D'));

    function loadSearchHistory() {
        const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        $searchHistory.empty();
        for (let city of searchHistory) {
            $searchHistory.append(`<div class="search-history-item">${city}</div>`);
        }
    }

    function saveSearchHistory(city) {
        let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        if (!searchHistory.includes(city)) {
            searchHistory.push(city);
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
            loadSearchHistory();
        }
    }

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
                    //display data in console
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