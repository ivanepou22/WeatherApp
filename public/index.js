const searchForm = document.querySelector('.search-loaction');
const cityValue = document.querySelector('.search-loaction input');
const cityName = document.querySelector('.city-name p');
const cardBody = document.querySelector('.card-body');
const timeImage = document.querySelector('.card-top img');
const cardInfo = document.querySelector('.back-card');
const weatherAppData = 'WeatherFocus';

const spitOutCelcius = (kelvin) => {
    celcius = Math.round(kelvin - 273.15);
    return celcius;
}
const isDayTime = (icon) => {
    if (icon.includes('d')) { return true }
    else { return false }
}

window.onload = () => {
fetchedLocalData = JSON.parse(localStorage.getItem(weatherAppData));
console.log("Locally fetched Data: ", fetchedLocalData);
if(fetchedLocalData === null){
  console.log("Empty Storage")
} else{
  updateWeatherApp(fetchedLocalData);
}
}


updateWeatherApp = (city) => {
    console.log("Data Fetched from API", city);
    const imageName = city.weather[0].icon;
    const iconSrc = `https://openweathermap.org/img/wn/${imageName}@2x.png`
    cityName.textContent = city.name;
    cityName.innerText =`${city.name}, ${city.sys.country}`;
    console.log(city.name, city.sys.country);
    cardBody.innerHTML = `
    <div class="card-mid row">
            <div class="text-center temp">
              <span>${spitOutCelcius(city.main.temp)}&deg;C</span>
            </div>
            <div class="col-4 condition-temp">
              <p class="condition">${city.weather[0].description}</p>
              <p class="high">${spitOutCelcius(city.main.temp_max)}&deg;C</p>
              <p class="low">${spitOutCelcius(city.main.temp_min)}&deg;C</p>
            </div>
          </div>

          <div class="icon-container card shadow mx-auto">
            <img src="${iconSrc}" alt="" />
          </div>
          <div class="card-bottom px-5 py-4 row display-row">
            <div class="card-bottom-temp">
              <div class="col-text-center">
                <span class="move-top">Feels Like</span>
                <p>${spitOutCelcius(city.main.feels_like)}&deg;C</p>
              </div>
              <div class="col text-center">
                <span class="move-top">Humidity</span>
                <p>${city.main.humidity}%</p>
              </div>
            </div>
          </div>
    `;
    if (isDayTime(imageName)) {
        console.log('day');
        timeImage.setAttribute('src', 'img/day_image.svg');
        if (cityName.classList.contains('text-white')) {
            cityName.classList.remove('text-white');
        } else {
            cityName.classList.add('text-black');
        }

    } else {
        console.log('night');
        timeImage.setAttribute('src', 'img/night_image.svg');
        if (cityName.classList.contains('text-black')) {
            cityName.classList.remove('text-black');
        } else {
            cityName.classList.add('text-white');
        }
    }
    cardInfo.classList.remove('d-none');
}


let now = new Date();
let date = document.querySelector('.city-name .date');
date.innerText = dateBuilder(now);

function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

// Loading the Weather Searched Data into Local storage.
function loadLocalStorageData(weatherData){
  console.log("Weather Data: ",weatherData);
  localStorage.setItem(weatherAppData, JSON.stringify( weatherData ));
}

//add an event listner to the form
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const citySearched = cityValue.value.trim();
    console.log(citySearched);
    searchForm.reset();
    
    requestCity(citySearched)
        .then((data) => {
            updateWeatherApp(data);
            loadLocalStorageData(data);
        })
        .catch((error) => { console.log(error) })
})
