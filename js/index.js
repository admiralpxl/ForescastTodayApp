const content = document.querySelector('.content');
const section = document.createElement('section');
const div = document.createElement('div')
const apiKey = '54eca79841673640c83f1cd8f1879ef2';
const api = (city, leng) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=${leng}`;


//Codigo que se ejecuta
mainScreen();
const form = document.querySelector('form');
const input = document.querySelector('input.main-search-form__input');
const searchByCity = document.querySelector('button.main-search-form__search');
const searchByLocation = document.querySelector('button.main-search-form__location');

form.addEventListener('submit', e => {
  e.preventDefault();
  const cityName = input.value;
  callApiByName(cityName);
});






//Funciones


function mainScreen() {
  const principalMarkup = `
<h1 class="main-search-title">Forescast Today</h1>
<form class="main-search-form">
  <label>
    <input class="main-search-form__input" type="text" placeholder="Buscar una ciudad">
    </label>
  <button class="main-search-form__search" type="submit">
    <span class="fas fa-search"></span>
    Buscar</button>
  <button class="main-search-form__location" type="submit">
    <span class="fas fa-search-location"></span>
    Localización actual</button>
</form>
`;
    section.innerHTML = principalMarkup;
    section.classList.add('main-search');
    content.appendChild(section);
}

const clear = (zone) => content.removeChild(zone);

function clearAfterWeatherCall() {
  clear(section);
  clear(div);
  section.classList.remove('weather');
  mainScreen();
}


function callApiByName(city, leng) {
fetch(api(city, leng))
.then(response => {
  return response.json();
})
.then(data => {
  console.log(data);
  let sunrise = data.sys.sunrise;
  let sunset = data.sys.sunset;
  let up = new Date(sunrise * 1000);
  let donw = new Date(sunset * 1000);
  let hour = (a) => ((a.getHours() + 11) % 12 + 1);
  const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${data.weather[0]["icon"]}.svg`;

  const markup = `
  <h1 class="weather-city">${data.name}, ${data.sys.country}</h1>
  <img class="weather-icon" src="${icon}" alt="${data.weather[0]["main"]}">
    <h2 class="weather-degree">${Math.trunc(data.main.temp)}°C</h2>
    <h3 class="weather-info">${data.weather[0].description}</h3>
  `

  const markupTwo = `
  <article class="weather-more-container">
    <span class="fas fa-sun"></span>
        <h3 class="weather-more-container__title">Amanecer</h3>
    <p class="weather-more-container__info">${hour(up)}:${up.getMinutes()} AM</p>
  </article>

<article class="weather-more-container">
    <span class="fas fa-moon"></span>
        <h3 class="weather-more-container__title">Atardecer</h3>
    <p class="weather-more-container__info">${hour(donw)}:${donw.getMinutes()} PM</p>
  </article>

  <article class="weather-more-container">
      <span class="fas fa-wind"></span>
          <h3 class="weather-more-container__title">Viento</h3>
      <p class="weather-more-container__info">${data.wind.speed} m/seg</p>
    </article>

<article class="weather-more-container">
    <span class="fas fa-thermometer-half"></span>
        <h3 class="weather-more-container__title">Sensación</h3>
    <p class="weather-more-container__info">${Math.trunc(data.main.feels_like)} °C</p>
  </article>

<article class="weather-more-container">
    <span class="fas fa-tint"></span>
        <h3 class="weather-more-container__title">Humedad</h3>
    <p class="weather-more-container__info">${data.main.humidity} %</p>
  </article>

<article class="weather-more-container">
  <span class="fas fa-eye"></span>
      <h3 class="weather-more-container__title">Visibilidad</h3>
  <p class="weather-more-container__info">${Math.trunc(data.visibility / 1000)} Km</p>
  </article>
  `;

    section.innerHTML = markup;
    section.classList.add('weather');
    content.appendChild(section);
    div.innerHTML = markupTwo;
    div.classList.add('weather-more');
    content.appendChild(div);

})
.catch( () => {
    alert('No se ha encontrado la ciudad');
});

}
