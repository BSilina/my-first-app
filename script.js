let now = new Date();

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

document.querySelector(
  "#current-time"
).innerHTML = `${day}, ${currentDate} ${month}`;

function formatSunrise(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours.toString().length < 2) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes.toString().length < 2) {
    minutes = `0${minutes}`;
  }

  let formattedSunrise = `${hours}:${minutes}`;

  return formattedSunrise;
}

function formatSunset(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours.toString().length < 2) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes.toString().length < 2) {
    minutes = `0${minutes}`;
  }

  let formattedSunset = `${hours}:${minutes}`;

  return formattedSunset;
}

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let forecastDay = date.getDate();
  let forecastMonth = date.getMonth() + 1;

  if (forecastDay.toString().length < 2) {
    forecastDay = `0${forecastDay}`;
  }

  if (forecastMonth.toString().length < 2) {
    forecastMonth = `0${forecastMonth}`;
  }

  let formattedForecastDate = `${forecastDay}.${forecastMonth}`;
  return formattedForecastDate;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let accordionItems = ["One", "Two", "Three", "Four", "Five", "Six", "Seven"];
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row accordion" id="weekday-detailed">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 8) {
      forecastHTML =
        forecastHTML +
        `<div class="accordion-item">
       <h2 class="accordion-header dynamic-font" id="panelsStayOpen-heading${
         accordionItems[index]
       }">
      <button
        class="accordion-button collapsed dynamic-font" type="button" data-bs-toggle="collapse"
        data-bs-target="#panelsStayOpen-collapse${accordionItems[index]}"
        aria-expanded="false"
        aria-controls="panelsStayOpen-collapse${accordionItems[index]}"
      >
        <div class="col-4">
          <span class="weekday">${formatDay(forecastDay.dt)}
          </span>, <span class="weekdate">${formatForecastDate(
            forecastDay.dt
          )}</span>
        </div>
        <div class="col-4 image">
          <img id="weekly-weather-icon" class="image-middle"
            src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"/>
        </div>
        <div class="col-4 index">
          <strong id="weekday-temp-max">${Math.round(
            forecastDay.temp.max
          )}</strong> /
          <span id="weekday-temp-min">${Math.round(
            forecastDay.temp.min
          )}</span><span>°C</span>
        </div>
      </button>
    </h2>
    <div
      id="panelsStayOpen-collapse${accordionItems[index]}"
      class="accordion-collapse collapse"
      aria-labelledby="panelsStayOpen-heading${accordionItems[index]}">
      <div class="accordion-body p-0 dynamic-font">
        <ul class="m-0 p-0">
          <li class="first-element">
            <span class="iconify" data-icon="bi:sunrise" data-inline="false"
            ></span>
            <span class="text">morning</span>
            <span class="index" id="temp-morning">
            ${Math.round(forecastDay.temp.morn)}<span>°C</span>
           </span>
          </li>
          <li class="second-element">
            <span class="iconify" data-icon="fontisto:day-sunny" data-inline="false"></span>
            <span class="text">day</span>
            <span class="index" id="temp-day">
            ${Math.round(forecastDay.temp.day)}<span>°C</span>
          </span>
          </li>
          <li class="third-element">
            <span class="iconify" data-icon="akar-icons:umbrella" data-inline="false"></span>
            <span class="text">chance</span>
            <span class="index" id="weekday-chance-of-rain">
            ${Math.round(forecastDay.pop)}%
           </span>
          </li>
          <li class="forth-element">
            <span class="iconify" data-icon="wi:barometer" data-inline="false"></span>
            <span class="text">pressure</span>
            <span class="index" id="weekday-pressure">
            ${forecastDay.pressure} hPa
           </span>
          </li>
          <li class="fifth-element">
            <span class="iconify" data-icon="bi:wind" data-inline="false"></span>
            <span class="text">w.speed</span>
            <span class="index">
            <span id="weekday-wind-speed">${Math.round(
              forecastDay.wind_speed
            )}</span>
            <span>km/h</span>
           </span>
          </li>
          <li class="six-element">
            <span class="iconify" data-icon="wi:sunrise" data-inline="false"></span>
            <span class="text">sunrise</span>
            <span class="index" id="weekday-sunrise">
            ${formatSunrise(forecastDay.sunrise)}
           </span>
          </li>
          <li class="seven-element">
            <span class="iconify" data-icon="bi:sunset" data-inline="false"></span>
            <span class="text">evening</span>
            <span class="index" id="temp-evening">
            ${Math.round(forecastDay.temp.eve)}<span>°C</span>
          </span>
          </li>
          <li class="eight-element">
            <span class="iconify" data-icon="mdi:weather-night" data-inline="false"></span>
            <span class="text">night</span>
            <span class="index" id="temp-night">
            ${Math.round(forecastDay.temp.night)}<span>°C</span>
           </span>
          </li>
          <li class="nine-element">
            <span class="iconify" data-icon="akar-icons:cloud" data-inline="false"></span>
            <span class="text">clouds</span>
            <span class="index" id="weekday-cloudiness">
             ${forecastDay.clouds}%
            </span>
          </li>
          <li class="tenth-element">
            <span class="iconify" data-icon="mi:drop" data-inline="false"></span>
            <span class="text">humidity</span>
            <span class="index" id="weekday-humidity">
             ${forecastDay.humidity}%
           </span>
          </li>
          <li class="eleventh-element">
            <span class="iconify" data-icon="carbon:uv-index-alt" data-inline="false"></span>
            <span class="text">UV-index</span>
            <span class="index" id="weekday-uv-index">
             ${forecastDay.uvi}
           </span>
          </li>
          <li class="twelfth-element">
            <span class="iconify" data-icon="wi:sunset" data-inline="false"></span>
            <span class="text">sunset</span>
            <span class="index" id="weekday-sunset">
            ${formatSunset(forecastDay.sunset)}
           </span>
          </li>
        </ul>
      </div>
    </div>
  </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `ad121762f7a5646c2417d19be72f81a3`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#info").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#w-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#city").innerHTML = response.data.name + ", ";
  document.querySelector("#country").innerHTML = response.data.sys.country;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feels-like").innerHTML =
    Math.round(response.data.main.feels_like) + "°C";
  document.querySelector("#cloudiness").innerHTML = response.data.clouds.all;
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document
    .querySelector("#current-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  celsiusTemp = response.data.main.temp;
  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = `ad121762f7a5646c2417d19be72f81a3`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(`#search-input`).value;
  searchCity(city);
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

var autocomplete;

function initMap() {
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("search-input"),
    { types: ["geocode"] }
  );
  google.maps.event.addListener(autocomplete, "place_changed", function () {});
}

function showFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let button = document.querySelector("button");
button.addEventListener("click", getPosition);

searchCity("Kyiv");
