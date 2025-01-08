let appId = "660e3f7f5c0056405ff4525716659fc8";
let units = "imperials";
let searchMethod;

function searchWeather(seatchTerm) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`
  )
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      init(result);
    });
}

function init(resultFromServer) {
  console.log(resultFromServer);
}
