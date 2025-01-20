let appId = "660e3f7f5c0056405ff4525716659fc8";
let units = "metric";
let searchMethod;

function getSearchMethod(searchTerm) {
  if (
    searchTerm.length === 5 &&
    Number.parseInt(searchTerm) + "" === searchTerm
  )
    searchMethod = "zip";
  else searchMethod = "q";
}

function searchWeather(searchTerm) {
  getSearchMethod(searchTerm);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`
  )
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      init(result);
    });
}

function init(resultFromServer) {
  switch (resultFromServer.weather[0].main) {
    case "Clear":
      document.body.style.backgroundImage = "url('./images/clear.jpg')";
      break;
    case "Clouds":
      document.body.style.backgroundImage = "url('./images/cloud.jpg')";
      break;
    case "Rain":
      document.body.style.backgroundImage = "url('./images/rain.jpg')";
      break;
    case "Drizzle":
      document.body.style.backgroundImage = "url('./images/drizzle.jpg')";

      break;
    case "Mist":
      document.body.style.backgroundImage = "url('./images/mist.jpg')";

      break;
    case "Thunderstorm":
      document.body.style.backgroundImage = "url('./images/thunderstorm.jpg')";

      break;
    case "Snow":
      document.body.style.backgroundImage = "url('./images/snow.jpg')";

      break;
  }
  let weatherDescriptionHeader = document.getElementById(
    "weatherDescriptionHeader"
  );
  let temperatureElement = document.getElementById("temperature");
  let humidityElement = document.getElementById("humidity");
  let windSpeedElement = document.getElementById("windSpeed");
  let cityHeader = document.getElementById("cityHeader");
  let weatherIcon = document.getElementById("documentIconImg");
  weatherIcon.src =
    "https://openweathermap.org/img/w/" +
    resultFromServer.weather[0].icon +
    ".png";

  let resultDescription = resultFromServer.weather[0].description;
  weatherDescriptionHeader.innerText =
    resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
  temperatureElement.innerHTML =
    Math.floor(resultFromServer.main.temp) + "&#176";
  windSpeedElement.innerHTML =
    "Wind is at " + Math.floor(resultFromServer.wind.speed) + " m/s";
  cityHeader.innerHTML = resultFromServer.name;
  humidityElement.innerHTML =
    "Humidity levels at " + resultFromServer.main.humidity + "%";
  setPositionForWeatherInfo();
}
function setPositionForWeatherInfo() {
  let weatherContainer = document.getElementById("weatherContainer");
  let weatherContainerHeight = weatherContainer.clientHeight;
  let weatherContainerWidth = weatherContainer.clientWidth;

  weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`;
  weatherContainer.style.top = `calc(50% - ${weatherContainerHeight / 2}px)`;

  weatherContainer.style.visibility = "visible";
}
function handleSearch() {
  let searchTerm = document.getElementById("searchInput").value;
  if (searchTerm) searchWeather(searchTerm);
}

document.getElementById("searchBtn").addEventListener("click", handleSearch);

document.getElementById("searchInput").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});
