async function init() {
  async function getLatLong(city, state, country) {
    const geocode = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=54b9d60c15be6afe3fc3093091f15172`,
      { mode: 'cors' },
    );
    const geocodeData = await geocode.json();
    lat = geocodeData.coord.lat;
    long = geocodeData.coord.lon;
    return { lat, long };
  }

  async function getWeather(lat, long) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=54b9d60c15be6afe3fc3093091f15172`,
      { mode: 'cors' },
    );
    const weather = await response.json();

    city = weather.name;
    temp = weather.main.temp;
    feelsLike = weather.main.feels_like;
    coverage = weather.weather[0].description;
    country = weather.sys.country;

    return { city, temp, feelsLike, coverage, country };
  }

  async function updateDOM(weather) {
    city = document.getElementById('city');
    city.textContent = weather.city + ' ' + weather.country;

    temp = document.getElementById('temp');
    temp.textContent = weather.temp;

    feelsLike = document.getElementById('feelsLike');
    feelsLike.textContent = weather.feelsLike;

    coverage = document.getElementById('coverage');
    coverage.textContent = weather.coverage;
  }

  // Add event listener for submit
  const search = document.getElementById('search');
  search.addEventListener('click', async (event) => {
    loc = document.getElementById('location');
    loc = loc.value;
    locArray = loc.split(',');

    city = locArray[0];
    state = locArray[1];
    country = locArray[2];

    coords = await getLatLong(city, state, country);

    weather = await getWeather(coords.lat, coords.long);
    updateDOM(weather);
  });
}

// Geocode city, state, country

init();
