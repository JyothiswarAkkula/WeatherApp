const temperatureField = document.querySelector(".temp p");
const cityNameField = document.querySelector(".cityName");
const dateTimeField = document.querySelector(".dateTime");
const weatherField = document.querySelector(".condition p");
const weatherIcon = document.querySelector(".weather-icon");
const searchField = document.querySelector(".searchfield");
const form = document.querySelector("form");

let target = "chittoor";
let clockInterval;

form.addEventListener("submit", searchForLocation);

const fetchResults = async (target) => {
  let url = `https://api.weatherapi.com/v1/current.json?key=d8ffb20ba11e41919d872829251905&q=${target}&aqi=no`;

  try {
    let res = await fetch(url);
    let data = await res.json();
    console.log(data);

    let locationName = data.location.name;
    let time = data.location.localtime;
    let temp = data.current.temp_c;
    let condition = data.current.condition.text;
    let icon = data.current.condition.icon;
    let timeZone = data.location.tz_id;

    update(temp, locationName, time, condition, icon, timeZone);
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Location not found. Please Enter a valid place.");
  }
};

function update(temp, locationName, time, condition, icon, timeZone) {
  temperatureField.innerText = `${temp}°C`;
  cityNameField.innerText = locationName;
  weatherField.innerText = condition;
  weatherIcon.src = icon;

  if (clockInterval) clearInterval(clockInterval);
  startClock(timeZone);
}

function searchForLocation(e) {
  e.preventDefault();
  target = searchField.value;
  fetchResults(target);
}

function startClock(timeZone) {
  clockInterval = setInterval(() => {
    const now = new Date();

    const options = {
      timeZone: timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      weekday: 'long',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };

    const dateTimeString = now.toLocaleString('en-US', options);
    dateTimeField.innerText = dateTimeString;

  }, 1000);
}

fetchResults(target);
