let now = new Date();
let h2 = document.querySelector("h2");

let hours = now.getHours();
if (hours < 10) {
  hours = "0" + hours;
}

let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = "0" + minutes;
} else {
  minutes = minutes + "";
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

h2.innerHTML = `${day} ${hours}:${minutes}`;

function displayCity(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#today-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-conditions").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "32a06aa1027d90ca44a2710198cb3080";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCity);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", handleSubmit);

function showLocationTemperature(response) {
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#today-temp");
  temperatureElement.innerHTML = `${temperature}`;
  console.log(response.data.name);
  let cityName = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
}

function searchLocationTemperature(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "32a06aa1027d90ca44a2710198cb3080";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showLocationTemperature);
}

function searchLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocationTemperature);
}

let button = document.querySelector("#location-button");
button.addEventListener("click", searchLocation);

searchCity("Paris");

//Disabled the below celsius and fahrenheit change buttons

//function changeCelsius(event) {
// event.preventDefault();
// let currentTemp = document.querySelector("#today-temp");
//  let fahrenheitTemp = 63;
// let celciusTemp = Math.round(((fahrenheitTemp - 32) * 5) / 9);
// currentTemp.innerHTML = celciusTemp;
//  let celsiusSymbol = document.querySelector("#change-celsius");
// let fahrenheitSymbol = document.querySelector("#change-fahrenheit");
//  celsiusSymbol.style.fontWeight = "bold";
/// fahrenheitSymbol.style.fontWeight = "normal";
//}

//let unitCelsius = document.querySelector("#change-celsius");
//unitCelsius.addEventListener("click", changeCelsius);

//function changeFahrenheit(event) {
//  event.preventDefault();
//  let currentTemp = document.querySelector("#today-temp");
//  let celsiusTemp = 17;
// let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);

// currentTemp.innerHTML = fahrenheitTemp;

// let celsiusSymbol = document.querySelector("#change-celsius");
// let fahrenheitSymbol = document.querySelector("#change-fahrenheit");
// celsiusSymbol.style.fontWeight = "normal";
// fahrenheitSymbol.style.fontWeight = "bold";
//}

//let unitFahrenheit = document.querySelector("#change-fahrenheit");
//unitFahrenheit.addEventListener("click", changeFahrenheit);
