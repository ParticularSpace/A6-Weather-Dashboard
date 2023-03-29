$(document).ready(function () {
  const $searchBtn = $('#search-button');
  const $searchHistory = $('#search-history');
  const $weatherTemp = $('.weatherTemp');
  const $weatherCity = $('.location');
  const $feelsLike = $('.feelsLike');
  const $dateCard = $('.date');
  const $todayDate = dayjs();
  const $windSpeed = $('.windSpeed');
  const $humidity = $('.humidity');
  const $weatherIcon = $('.weatherIcon');

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

  // Clear weather data
  function clearWeatherData() {
    $weatherCity.empty();
    $weatherTemp.empty();
    $feelsLike.empty();
    $windSpeed.empty();
    $humidity.empty();
    $('.weather-info').remove();
  }


  // Get weather data from OpenWeather API
  function getWeatherData(city) {
    clearWeatherData();
    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=imperial&appid=25d33f8c57018604cd95eaaaa98fb241`,
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        // Save data to local storage
        saveToSearchHistory(data.city.name);

        //console logs for testing
        console.log(data);

        // Display data
        $weatherCity.html(data.city.name + ', ' + data.city.country);
        $weatherTemp.html(data.list[0].main.temp + ' &deg;F');
        $feelsLike.html(data.list[0].main.feels_like + ' &deg;F');
        $windSpeed.html(data.list[0].wind.speed + ' mph');
        $humidity.html(data.list[0].main.humidity + '%');
        $weatherIcon.addClass(getWeatherIconClass(data.list[0].weather[0].description));



        updateForecastDates();
        displayForecast(data);
      },
      error: function () {
        console.log('Error');
      }
    });
  }
  // Save search history to local storage
  function saveToSearchHistory(city) {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    if (searchHistory.indexOf(city) === -1) {
      searchHistory.push(city);
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }

    loadSearchHistory();
  }
  // Load search history from local storage
  function loadSearchHistory() {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    $searchHistory.empty();
    searchHistory.forEach(function (city) {
      const $historyItem = $('<button>').addClass('history-item').text(city);
      $searchHistory.append($historyItem);
    });
  }

  // Get weather icon class
  function getWeatherIconClass(weatherDescription) {
    const desc = weatherDescription.toLowerCase();
  
    if (desc.includes('clear')) {
      return 'wi wi-day-sunny';
    } else if (desc.includes('clouds') || desc.includes('overcast')) {
      return 'wi wi-cloudy';
    } else if (desc.includes('rain')) {
      return 'wi wi-rain';
    } else if (desc.includes('snow')) {
      return 'wi wi-snow';
    } else if (desc.includes('thunderstorm')) {
      return 'wi wi-thunderstorm';
    } else {
      return 'wi wi-day-sunny'; // return a default icon class
    }
  }
  

  function displayForecast(data) {
    for (let i = 0; i < 5; i++) {
      // Get forecast data
      const forecastTemp = data.list[i * 8].main.temp;
      const weatherDescription = data.list[i * 8].weather[0].description;
      const weatherIconClass = getWeatherIconClass(weatherDescription);
      const forecastHumidity = data.list[i * 8].main.humidity;
      const forecastWindSpeed = data.list[i * 8].wind.speed;
      const $locationDate = $(`.locationDate${i + 1}`);
      const $mapLocation = $(`.mapLocation:eq(${i})`);
      const $temperature = $(`.temperature${i + 1}`);
  
      // Create weather info elements
      const $weatherIcon = $('<i>').addClass(weatherIconClass);
      const $weatherInfo = $('<div>').addClass('weather-info');
      const $temp = $('<p>').html(`Temperature: <span class="temp-value">${forecastTemp}&deg;F</span>`);
      const $humidity = $('<p>').html(`Humidity: <span class="humidity-value">${forecastHumidity}%</span>`);
      const $windSpeed = $('<p>').html(`Wind Speed: <span class="wind-speed-value">${forecastWindSpeed} mph</span>`);
  
      $locationDate.html(dayjs(data.list[i * 8].dt_txt).format('dddd, MMMM D'));
      $mapLocation.empty().append($weatherIcon).append(weatherDescription); // update $mapLocation here
      $temperature.html(`${forecastTemp}&deg;F`);
      $weatherInfo.append($temp).append($humidity).append($windSpeed);
      $(`.weather-card:eq(${i})`).append($weatherInfo);
  
      console.log($mapLocation);
    }
  }
  


});
