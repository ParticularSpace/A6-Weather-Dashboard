$(document).ready(function () {
    const $searchBtn = $('#search-button');
    const $searchHistory = $('#search-history');
    const $weatherTemp = $('.weatherTemp');
    const $weatherCity = $('.location');
    const $feelsLike = $('.feelsLike');
    const $dateCard = $('.date');
    const $todayDate = dayjs();

    // Set today's date on the element with class date using dayjs
    $dateCard.html(dayjs().format('dddd, MMMM D'));

    // Load search history
    loadSearchHistory();

    // Apply date to forecast cards
    updateForecastDates();

    // Event listener for search button
    $searchBtn.on('click', function (event) {
        let $city = $('#city').val();
        event.preventDefault();
        if ($city !== '') {
            getWeatherData($city);
        }
    });

    // Event listener for search history items
    $searchHistory.on('click', '.history-item', function () {
        getWeatherData($(this).text());
    });

    function updateForecastDates() {
        const days = ['One', 'Two', 'Three', 'Four', 'Five'];
        let currentDate = $todayDate;

        days.forEach(function (day, index) {
            currentDate = currentDate.add(1, 'day');
            $(`.locationDate${day}`).html(currentDate.format('dddd, MMMM D'));
        });
    }

    function getWeatherData(city) {
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=imperial&appid=25d33f8c57018604cd95eaaaa98fb241`,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                // Save data to local storage
                saveToSearchHistory(data.city.name);

                // Display data
                $weatherCity.html(data.city.name + ', ' + data.city.country);
                $weatherTemp.html(data.list[0].main.temp + ' &deg;F');
                $feelsLike.html(data.list[0].main.feels_like + ' &deg;F');

                updateForecastDates();
                displayForecast(data);
            },
            error: function () {
                console.log('Error');
            }
        });
    }

    function saveToSearchHistory(city) {
        let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

        if (searchHistory.indexOf(city) === -1) {
            searchHistory.push(city);
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        }

        loadSearchHistory();
    }

    function loadSearchHistory() {
        let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

        $searchHistory.empty();
        searchHistory.forEach(function (city) {
            const $historyItem = $('<button>').addClass('history-item').text(city);
            $searchHistory.append($historyItem);
        });
    }

    function displayForecast(data) {
        for (let i = 0; i < 5; i++) {
            const forecastTemp = data.list[i * 8].main.temp;
            const $temperature = $(`.temperature${i + 1}`);
            $temperature.html(`${forecastTemp}&deg;F`);
        }
    }
});
