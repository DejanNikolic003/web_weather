const API_KEY = "5NSKC4V9ZT53FM77FKAJNKCXQ";

const searchInputEl = document.querySelector("#searchInput");
const searchButtonEl = document.querySelector("#searchButton");

const textWrapperEl = document.querySelector(".text-content");
const loaderEl = document.querySelector(".loader");

const cityEl = document.querySelector(".city");
const conditionsEl = document.querySelector(".conditions");
const celsiusEl = document.querySelector(".celsius");

const getWeather = async (city = "Belgrade") => {
  const url =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
    city +
    "?unitGroup=metric&key=" +
    API_KEY;
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

const displayWeather = (res) => {
  const cityEl = document.querySelector(".city");
  const conditionsEl = document.querySelector(".conditions");
  const celsiusEl = document.querySelector(".celsius");

  cityEl.textContent = res.resolvedAddress;
  conditionsEl.textContent = res.currentConditions.conditions;
  celsiusEl.textContent = res.currentConditions.temp + "°C";
};

const displayWeatherIcon = (res) => {};

searchButtonEl.addEventListener("click", (event) => {
  loaderEl.classList.toggle("hidden");
  getWeather(searchInputEl.value)
    .then(displayWeather)
    .catch(() => {
      cityEl.textContent = "City not found!";
      conditionsEl.textContent = "";
      celsiusEl.textContent = "";
    })
    .finally(() => {
      loaderEl.classList.toggle("hidden");
    });
  event.preventDefault();
});
