let appId = "660e3f7f5c0056405ff4525716659fc8";
let units = "metric";

function getSearchMethod(searchTerm) {
  return /^\d{5}$/.test(searchTerm) ? "zip" : "q";
}

function showLoading() {
  document.getElementById("loadingSpinner").style.display = "block";
}

function hideLoading() {
  document.getElementById("loadingSpinner").style.display = "none";
}

function showAlert(message) {
  alert(message);
}

function searchWeather(searchTerm) {
  showLoading();
  const searchMethod = getSearchMethod(searchTerm);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((result) => {
      init(result);
      hideLoading();
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      hideLoading();
      showAlert("Failed to fetch weather data. Please try again.");
    });
}

function init(resultFromServer) {
  updateBackground(resultFromServer.weather[0].main);

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

function updateBackground(weatherCondition) {
  const backgroundImages = {
    Clear: "clear.jpg",
    Clouds: "cloud.jpg",
    Rain: "rain.jpg",
    Drizzle: "drizzle.jpg",
    Mist: "mist.jpg",
    Thunderstorm: "thunderstorm.jpg",
    Snow: "snow.jpg",
  };
  document.body.style.backgroundImage = `url('./images/${
    backgroundImages[weatherCondition] || "default.jpg"
  }')`;
}

function setPositionForWeatherInfo() {
  let weatherContainer = document.getElementById("weatherContainer");
  weatherContainer.style.visibility = "visible";
}

function handleSearch() {
  const searchTerm = document.getElementById("searchInput").value.trim();

  if (!searchTerm) {
    showAlert("Please enter a valid location or zip code.");
    return;
  }

  searchWeather(searchTerm);
}

document.getElementById("searchBtn").addEventListener("click", handleSearch);

document.getElementById("searchInput").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});
