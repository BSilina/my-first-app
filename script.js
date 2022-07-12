let now = new Date();
let currentTime = document.querySelector(`#current-time`);

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
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let currentDate = now.getDate();
let year = now.getFullYear();
currentTime.innerHTML = `${day}, ${currentDate} ${month}, ${year}`;

function showTemp(response) {
  document.querySelector(".recent-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".info").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function search(city) {
  let apiKey = `ad121762f7a5646c2417d19be72f81a3`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector(`#search-input`).value;
  search(city);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `ad121762f7a5646c2417d19be72f81a3`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("button");
button.addEventListener("click", getPosition);

function convertToFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".recent-temp");
  tempElement.innerHTML = 68;
}

function convertToCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".recent-temp");
  tempElement.innerHTML = 20;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

search("Kyiv");
