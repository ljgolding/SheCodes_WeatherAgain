let currentTime = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

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
    "December"
  ];

  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let currentHours = date.getHours();
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let today = `${currentDay}, ${currentHours}:${currentMinutes}, ${currentMonth} ${currentDate}, ${currentYear}`;

  return today;
}
let current = document.querySelector("#rightNow");
current.innerHTML = formatDate(currentTime);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "f3dfa8d7baf16dece455736a2124255f";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  console.log(url);
  axios.get(url).then(showTemperatureCurrent);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

function showTemperatureCurrent(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentNow = document.querySelector("#currentWeather");
  currentNow.innerHTML = `It is ${temperature}°C in ${response.data.name}`;
}

//STARTING POINT A

function searchCityA(event) {
  event.preventDefault();
  let pointA = document.querySelector("#pointA");
  let resultA = document.querySelector("#resultA");
  let forecastCityA=document.querySelector("#forecastCityA");
  forecastCityA.innerHTML=pointA.value;
  resultA.innerHTML = pointA.value;
  let apiKey = "f3dfa8d7baf16dece455736a2124255f";
  let city = pointA.value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperatureA);
}

let formA = document.querySelector("#locationA");
formA.addEventListener("submit", searchCityA);



function getForecastA(coordinates) {
  console.log(coordinates);
  let apiKey = "f3dfa8d7baf16dece455736a2124255f";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiURL);

  axios.get(apiURL).then(displayForecastA);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecastA(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecastA");

  let forecastHTML = `<div class="row">  
  
  
  `;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `  
                <div class="col-2">
                
                  <div class="weather-forecast-date">${formatDay(
                    forecastDay.dt
                  )}</div>
                  <img
                    src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"
                    alt=""
                    width="36"
                  />
                  <div class="weather-forecast-temperature">
                    <span class="weather-forecast-temperature-max"> ${Math.round(
                      forecastDay.temp.max
                    )}° </span>
                    <span class="weather-forecast-temperature-min"> ${Math.round(
                      forecastDay.temp.min
                    )}° </span>
                  </div>
                </div>
              `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}




function showTemperatureA(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempAnow = document.querySelector("#currentTempA");
  tempAnow.innerHTML = `${temperature}`;

  let iconElement = document.querySelector("#iconA");
  iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let descriptionElement = document.querySelector("#descriptionA");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let windElement = document.querySelector("#windA");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let humidityElement = document.querySelector("#humidityA");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
    
celsiusTemperatureA = response.data.main.temp;
getForecastA(response.data.coord);
    
}





//CHECKPOINT #1 B

function searchCityB(event) {
  event.preventDefault();
  let pointB = document.querySelector("#pointB");
  let resultB = document.querySelector("#resultB");
  resultB.innerHTML = pointB.value;

  let forecastCityB = document.querySelector("#forecastCityB");
  forecastCityB.innerHTML = pointB.value;


  let apiKey = "f3dfa8d7baf16dece455736a2124255f";
  let city = pointB.value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperatureB);
}

let formB = document.querySelector("#locationB");
formB.addEventListener("submit", searchCityB);


function getForecastB(coordinates) {
  console.log(coordinates);
  let apiKey = "f3dfa8d7baf16dece455736a2124255f";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiURL);

  axios.get(apiURL).then(displayForecastB);
}


function displayForecastB(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecastB");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `  
                <div class="col-2">

                  <div class="weather-forecast-date">${formatDay(
                    forecastDay.dt
                  )}</div>
                  <img
                    src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"
                    alt=""
                    width="36"
                  />
                  <div class="weather-forecast-temperature">
                    <span class="weather-forecast-temperature-max"> ${Math.round(
                      forecastDay.temp.max
                    )}° </span>
                    <span class="weather-forecast-temperature-min"> ${Math.round(
                      forecastDay.temp.min
                    )}° </span>
                  </div>
                </div>
              `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}





function showTemperatureB(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempnow = document.querySelector("#currentTempB");
  tempnow.innerHTML = `${temperature}`;



  let iconElement = document.querySelector("#iconB");
  iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let descriptionElement = document.querySelector("#descriptionB");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let windElement = document.querySelector("#windB");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let humidityElement = document.querySelector("#humidityB");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);

celsiusTemperatureB = response.data.main.temp;

getForecastB(response.data.coord);
    

}





//CHECKPOINT #2 C

function searchCityC(event) {
  event.preventDefault();
  let pointC = document.querySelector("#pointC");
  let resultC = document.querySelector("#resultC");
  resultC.innerHTML = pointC.value;
  let apiKey = "f3dfa8d7baf16dece455736a2124255f";
  let city = pointC.value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperatureC);
}

let formC = document.querySelector("#locationC");
formC.addEventListener("submit", searchCityC);

function showTemperatureC(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempCnow = document.querySelector("#currentTempC");
  tempCnow.innerHTML = `${temperature}`;


      let iconElement = document.querySelector("#iconC");
      iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
      iconElement.setAttribute("alt", response.data.weather[0].description);

  let descriptionElement = document.querySelector("#descriptionC");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let windElement = document.querySelector("#windC");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let humidityElement = document.querySelector("#humidityC");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
celsiusTemperatureC = response.data.main.temp;

}








//CHECKPOINT #3 D

function searchCityD(event) {
  event.preventDefault();
  let pointD = document.querySelector("#pointD");
  let resultD = document.querySelector("#resultD");
  resultD.innerHTML = pointD.value;
  let apiKey = "f3dfa8d7baf16dece455736a2124255f";
  let city = pointD.value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperatureD);
}

let formD = document.querySelector("#locationD");
formD.addEventListener("submit", searchCityD);

function showTemperatureD(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempDnow = document.querySelector("#currentTempD");
  tempDnow.innerHTML = `${temperature}`;

       let iconElement = document.querySelector("#iconD");
      iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
      iconElement.setAttribute("alt", response.data.weather[0].description);
  let descriptionElement = document.querySelector("#descriptionD");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let windElement = document.querySelector("#windD");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let humidityElement = document.querySelector("#humidityD");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);

celsiusTemperatureD = response.data.main.temp;


}




//FINAL DESTINATION E

function searchCityE(event) {
  event.preventDefault();
  let pointE = document.querySelector("#pointE");
  let resultE = document.querySelector("#resultE");
  resultE.innerHTML = pointE.value;
  let apiKey = "f3dfa8d7baf16dece455736a2124255f";
  let city = pointE.value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperatureE);
}

let formE = document.querySelector("#locationE");
formE.addEventListener("submit", searchCityE);

function showTemperatureE(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempEnow = document.querySelector("#currentTempE");
  tempEnow.innerHTML = `${temperature}`;

       let iconElement = document.querySelector("#iconE");
       iconElement.setAttribute(
         "src",
         `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
       );
       iconElement.setAttribute("alt", response.data.weather[0].description);

  let descriptionElement = document.querySelector("#descriptionE");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let windElement = document.querySelector("#windE");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let humidityElement = document.querySelector("#humidityE");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);

celsiusTemperatureE = response.data.main.temp;


}


